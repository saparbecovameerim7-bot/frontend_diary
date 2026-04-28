import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Страница недоступна</h2>
      <p className="notfound-text">
        Похоже, такой страницы не существует или она была удалена.
      </p>

      <Link to="/" className="notfound-button">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;