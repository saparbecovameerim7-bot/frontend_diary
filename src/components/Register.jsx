import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Register = ({ register, studentClass, setStudentClass }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const navigate = useNavigate();

  const classes = [
    "1А", "1Б", "2А", "2Б", "3А", "3Б",
    "6А", "6Б", "7А", "7Б"
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const user = { 
      username,
      email, 
      password, 
      student_class: studentClass };
    const res = await register(user);
    console.log(res);

    if (res?.access_token) {
      navigate("/");
    }



    setEmail("");
    setPassword("");
    setUsername("");
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          required
        />
        <select
          className="register__input"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          required
        >
          <option value="">Выберите класс</option>
          {classes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          required
        />
        <button>Registration</button>
        {/* 
        {message && <p>{message}</p>} */}
      </form>
    </div>
  );
};

export default Register;