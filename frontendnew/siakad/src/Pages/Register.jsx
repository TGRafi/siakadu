import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function RegistMHS() {
  const navigate = useNavigate();
  
  // state untuk input form
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle submit ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, nim, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Register berhasil! Silakan login.");
        navigate("/login");
      } else {
        alert(data.error || "Register gagal");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error server");
    }
  };

  return (
    <div className="grad-color1 min-vh-100 d-flex align-items-center">
      <div className="d-flex flex-column flex-md-row mx-auto rounded-4 bg-transparent">
        {/* LEFT SIDE */}
        <div className="register-box py-4 px-3 bg-white w-100 w-md-50 shadow-lg rounded-4 ms-md-4">
          <h5 className="text-center mb-4 text-black fw-bold bg-white">
            Registrasi
          </h5>
          <form
            className="mx-auto text-black bg-white"
            style={{ width: "90%" }}
            onSubmit={handleSubmit} // hanya ini ditambah
          >
            <div className="form-group mb-2 bg-white">
              Nama Lengkap
              <input
                type="text"
                className="form-control rounded-5"
                placeholder="Masukkan Nama Lengkap"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            <div className="mb-2 bg-white">
              NIM
              <input
                type="text"
                className="form-control rounded-5"
                placeholder="Masukkan NIM"
                required
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
            </div>

            <div className="mb-2 bg-white">
              Email
              <input
                type="email"
                className="form-control rounded-5"
                placeholder="Masukkan email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2 bg-white">
              Password
              <input
                type="password"
                className="form-control rounded-5"
                placeholder="Masukkan password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="button rounded-3 w-100 my-4 bg-color1 bg-hover1 py-2 rounded-5"
            >
              Register
            </button>
          </form>
          <div
            className="text-center bg-white my-2"
            style={{ fontSize: "14px" }}
          >
            Sudah ada akun atau seorang dosen?{" "}
            <Link to="/login" className="bg-white">
              Log in
            </Link>
          </div>
        </div>

        {/*Sisi kanan*/}
        <div className="ms-md-4 mt-4 mb-md-0 bg-transparent text-white text-center text-md-start">
          <h6 className="bg-transparent">- UNIVERSITY Present -</h6>
          <h3 className="bg-transparent fw-bold">
            Let's become part of the big family !
          </h3>
        </div>
      </div>
    </div>
  );
}

export default RegistMHS;