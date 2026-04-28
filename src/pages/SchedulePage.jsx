import React from "react";

const SchedulePage = ({ schedule }) => {
  const grouped = schedule.reduce((acc, lesson) => {
    if (!acc[lesson.date]) {
      acc[lesson.date] = [];
    }
    acc[lesson.date].push(lesson);
    return acc;
  }, {});

  return (
    <main className="schedule-page">
      <h1>📅 Расписание</h1>

      {Object.keys(grouped).length === 0 && <p>Нет расписания</p>}

      {Object.entries(grouped).map(([date, lessons]) => (
        <section key={date} className="schedule-section">
          <h2 className="schedule-date">{date}</h2>

          <div className="schedule-grid">
            {lessons.map((lesson, index) => (
              <div key={index} className="lesson">
                
                {/* Левая часть */}
                <div className="lesson-info">
                  <h3>{lesson.subject}</h3>
                  <p>👨‍🏫 {lesson.teacher}</p>
                  <p>📍 Кабинет: {lesson.classroom}</p>
                </div>

                {/* Правая часть */}
                <div className="lesson-meta">
                  <p className="time">
                    {lesson.start_time} - {lesson.end_time}
                  </p>
                  <p className="class-name">{lesson.class_name}</p>
                </div>

              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default SchedulePage;