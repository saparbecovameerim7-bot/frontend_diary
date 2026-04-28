import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({data}) => {
  return (
    <div className="sidebar">
      <h2>📘 Дневник</h2>

      <Link to="/">🏠 Главная</Link>
      <Link to="/schedule">📅 Расписание</Link>
      <Link to="/grades">📈 Оценки</Link>
      <Link to="/attendance">📋 Посещаемость</Link>
      <Link to="/profile">👤 Профиль {data?.username}</Link>
    </div>
  );
};

export default Sidebar;