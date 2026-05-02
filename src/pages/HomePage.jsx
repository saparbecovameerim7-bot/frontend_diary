import React, { useEffect, useState } from "react";

const HomePage = ({ data, schedule, grades, attendance }) => {
  const date_today = new Date().toISOString().split("T")[0];


  const filtered = schedule?.filter((item) => item.date === date_today);
  const filteredGrades = grades?.filter((item) => item.date === date_today);
  const filteredAttendance = attendance?.filter((item) => item.date === date_today);
  const missedCount = attendance?.filter((item) => !item.attendance).length;
  const todayMissed = filteredAttendance?.filter((item) => !item.attendance).length;


  return (
    <div>
      <h1>👋 Привет, {data?.username}</h1>

      <div className="grid container">
        <div className="card">
          <h2 className="card-title">📅 Сегодня</h2>

          {filtered && filtered.length > 0 ? (
            <div className="lesson-list">
              {filtered.map((item) => (
                <div key={item.id} className="lesson-card">
                  {/* Левая часть */}
                  <div>
                    <h3 className="lesson-subject">{item.subject}</h3>
                    <p className="lesson-text">👨‍🏫 {item.teacher}</p>
                    <p className="lesson-text">📍 Кабинет: {item.classroom}</p>
                  </div>

                  {/* Правая часть */}
                  <div className="lesson-right">
                    <p className="lesson-time">
                      {item.start_time} - {item.end_time}
                    </p>
                    <p className="lesson-class">{item.class_name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">😴 Сегодня нет расписания</p>
          )}
        </div>
        <div className="dashboard">

<div className="card">
  <h2>📈 Оценки (сегодня)</h2>

  {filteredGrades?.length === 0 ? (
    <p className="empty">Нет оценок</p>
  ) : (
    filteredGrades.map((g) => (
    <div className="grades-grid">
      {filteredGrades.map((item) => (
        <div className="grade-card" key={item.id}>
              <div className="card-header">
                <h2>{item.subject_name || item.subject}</h2>
                <span className={`grade grade-${item.grade}`}>
                  {item.grade}
                </span>
              </div>

              <p className="topic">
                📘 {item.lesson_topic || "Без темы"}
              </p>

              <p className="date">
                📅 {item.date}
              </p>
            </div>
          ))}
        </div>
    ))
  )}
</div>

<div className="card">
  <h2>📊 Посещаемость</h2>

  <div className="attendance-info">
    <p>❌ Всего пропусков: <b>{missedCount || 0}</b></p>
    <p>📅 Сегодня пропусков: <b>{todayMissed || 0}</b></p>
  </div>

  <div className="attendance-list">
    {filteredAttendance?.length === 0 ? (
      <p className="empty">Нет данных за сегодня</p>
    ) : (
      filteredAttendance.map((item) => (
        <div className="row" key={item.id}>
          <span>{item.subject_name}</span>
          <span
            className={
              item.attendance ? "status present" : "status absent"
            }
          >
            {item.attendance ? "✔ Был" : "✖ Отсутствовал"}
          </span>
        </div>
      ))
    )}
  </div>
</div>

</div>

      </div>
    </div>
  );
};

export default HomePage;