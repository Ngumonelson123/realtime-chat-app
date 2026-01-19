import React, { useState } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", form);
      setMsg("✅ Registration successful. Login now...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={styles.input} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} />
        <button style={styles.btn}>Create Account</button>
      </form>
      <p>{msg}</p>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

const styles = {
  input: { width: "100%", padding: 10, margin: "10px 0" },
  btn: { width: "100%", padding: 10, background: "#4f46e5", color: "white", border: "none" },
};
