const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ambil semua mahasiswa sesuai table sekarang
router.get('/mahasiswa', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nama, nim, email FROM mahasiswa'); 
    // jangan pakai gpa dulu, kolom belum ada
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Ambil total mahasiswa
router.get('/total-mahasiswa', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM mahasiswa');
    const total = parseInt(result.rows[0].count);
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;