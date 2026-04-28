import React from "react";

function AttendancePage({ attendance }) {
  return (
    <div className="attendance-container">
      <h2 className="title">Attendance</h2>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((item) => (
            <tr key={item.id}>
              <td>{item.student_name}</td>
              <td>{item.subject_name}</td>
              <td>{item.date}</td>
              <td>
                <span
                  className={
                    item.attendance ? "status present" : "status absent"
                  }
                >
                  {item.attendance ? "Present" : "Absent"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendancePage;