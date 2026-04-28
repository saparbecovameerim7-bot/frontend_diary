import React from "react";

const GradesPage = ({ grades }) => {
  return (
    <div className="grades-container">
      <h1 className="title">📊 Мои оценки</h1>

      {grades.length === 0 ? (
        <p className="empty">Нет оценок</p>
      ) : (
        <div className="grades-grid">
          {grades.map((item) => (
            <div className="grade-card" key={item.id}>
              <div className="card-header">
                <h2>{item.subject_name || item.subject}</h2>
                <span className={`grade grade-${item.grade}`}>
                  {item.grade}
                </span>
              </div>

              <p className="topic">📘 {item.lesson_topic || "Без темы"}</p>

              <p className="date">📅 {item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GradesPage;