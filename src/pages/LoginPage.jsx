import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // если уже авторизован → на главную
  if (localStorage.getItem("access_token")) {
    navigate("/")
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://school-diary-v4m0.onrender.com/api/login/", form);

      // сохраняем токены
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      if (res.data.access_token) {
        navigate("/");
      }
    } catch (err) {
      setError("❌ Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>🔐 Вход</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Имя пользователя"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>

        <p>
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
