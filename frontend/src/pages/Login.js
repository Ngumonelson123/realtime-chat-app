import React, { useState } from "react";
import { api, setAuthToken } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setAuthToken(res.data.token);

      navigate("/rooms");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} />
        <button style={styles.btn}>Login</button>
      </form>

      <p>{msg}</p>

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

const styles = {
  input: { width: "100%", padding: 10, margin: "10px 0" },
  btn: { width: "100%", padding: 10, background: "#16a34a", color: "white", border: "none" },
};
