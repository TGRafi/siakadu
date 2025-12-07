const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (req, res) => {
  const { nama, nim, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO mahasiswa (nama, nim, email, password) VALUES ($1,$2,$3,$4) RETURNING *',
      [nama, nim, email, hashedPassword]
    );
    res.json({ message: 'User registered', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // cek mahasiswa dulu
    let userResult = await pool.query('SELECT * FROM mahasiswa WHERE email=$1', [email]);
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: 'Invalid password' });

      const nimProdiId = user.nim.slice(2,4); // ambil digit 3 & 4
      const prodiResult = await pool.query('SELECT nama_prodi FROM prodi WHERE id=$1', [nimProdiId]);
      const namaProdi = prodiResult.rows.length > 0 ? prodiResult.rows[0].nama_prodi : '-';

      return res.json({ id: user.id, nama: user.nama, nim: user.nim, email: user.email, role: 'mahasiswa', prodi: namaProdi });
    }

    // cek dosen
    userResult = await pool.query('SELECT * FROM dosen WHERE email=$1', [email]);
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: 'Invalid password' });
      return res.json({ id: user.id, nama: user.nama, email: user.email, role: 'dosen', canAccKRS: user.canacckrs });
    }

    res.status(400).json({ error: 'Invalid email' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;