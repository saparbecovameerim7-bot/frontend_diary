import React, { useState } from "react";

const Register = ({ register, studentClass, setStudentClass }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = [
    "1А", "1Б", "2А", "2Б", "3А", "3Б",
    "6А", "6Б", "7А", "7Б"
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ защита от undefined
    if (typeof register !== "function") {
      console.error("register is not a function");
      return;
    }

    const user = {
      username,
      email,
      password,
      student_class: studentClass,
    };

    try {
      await register(user);

      // очистка формы
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Ошибка регистрации:", err);
    }
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
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          required
        />

        <select
          value={studentClass || ""}
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

        <button type="submit">Registration</button>
      </form>
    </div>
  );
};

export default Register;