import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage = ({ studentClass, setStudentClass }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function register(user) {
    try {
      const result = await fetch("https://school-diary-v4m0.onrender.com/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const body = await result.json();

      // ❌ если ошибка от сервера
      if (!result.ok) {
        setMessage(body.message || "Ошибка регистрации");
        return null;
      }

      // ✅ успех
      setMessage(body.message || "Регистрация успешна");

      // сохраняем токены ТОЛЬКО если они есть
      if (body.access_token && body.refresh_token) {
        localStorage.setItem("access_token", body.access_token);
        localStorage.setItem("refresh_token", body.refresh_token);

        // редирект на главную
        navigate("/");
      }

      return body;

    } catch (error) {
      console.error(error);
      setMessage("❌ Ошибка соединения с сервером");
      return null;
    }
  }

  return (
    <div className="register-container">
      <Register
        register={register}
        studentClass={studentClass}
        setStudentClass={setStudentClass}
      />

      {/* сообщение */}
      {message && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default RegisterPage;