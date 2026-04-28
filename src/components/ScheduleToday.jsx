import React from "react";
import React, { useEffect, useState } from "react";
import API from "../api/axios";

const ScheduleToday = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    API.get("schedule/").then((res) => setSchedule(res.data));
  }, []);

  return (
    <div>
      <h1>📅 Расписание</h1>
      {schedule.map((s) => (
        <p key={s.id}>
          {s.day} - {s.subject}
        </p>
      ))}
    </div>
  );
};

export default ScheduleToday;