import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import GradesPage from "./pages/GradesPage";
import AttendancePage from "./pages/AttendancePage";

import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./Layout/MainLayout";

import API from "./api/axios";

const App = () => {
  const [studentClass, setStudentClass] = useState("");
  const [data, setData] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payment, setPayments] = useState([]);

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    if (access) {
      loadUser(access);
    }
  }, []);

  // 🔄 ОБНОВЛЕНИЕ ВСЕХ ДАННЫХ
  const refreshData = async (userData = null) => {
    const access = localStorage.getItem("access_token");
    try {
      const user = userData || data;

      if (!access) return;

      await loadSchedule(access, user.student_class);
      await loadGrades(access, user.username);
      await loadAttendance(access, user.username);
      await loadPayment(access, user.username);
    } catch (error) {
      console.error("Ошибка refreshData:", error);
    }
  };

  // 👤 USER INFO
  async function loadUser(access) {
    try {
      const res = await API.get("user-info/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setData(res.data);
      console.log("data", res.data);
      // 🔥 сразу грузим остальные данные
      await refreshData(res.data);
    } catch (error) {
      console.error(`Ошибка user-info: ${error}`);
    }
  }

  // 📅 SCHEDULE
  async function loadSchedule(access, student_class) {
    try {
      const res = await API.get(`schedule/?student_class=${student_class}`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setSchedule(res.data);
    } catch (error) {
      console.error(`Ошибка schedule: ${error}`);
    }
  }

  // 💳 PAYMENT
  async function loadPayment(access, username) {
    try {
      const res = await API.get(`payment/?username=${username}`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setPayments(res.data);
    } catch (error) {
      console.error(`Ошибка payment: ${error}`);
    }
  }

  // 📊 GRADES
  async function loadGrades(access, username) {
    try {
      const res = await API.get(`/grades/?username=${username}`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setGrades(res.data);
    } catch (error) {
      console.error(`Ошибка grades: ${error}`);
    }
  }

  // 📌 ATTENDANCE
  async function loadAttendance(access, username) {
    try {
      const res = await API.get(`/attendance/?username=${username}`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setAttendance(res.data);
    } catch (error) {
      console.error(`Ошибка attendance: ${error}`);
    }
  }

  // 🚀 INIT

  return (
    <Routes>
      {/* 🔓 PUBLIC */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/register"
        element={
          <RegisterPage
            studentClass={studentClass}
            setStudentClass={setStudentClass}
          />
        }
      />

      {/* 🔐 PRIVATE */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout data={data} />}>
          <Route
            path="/"
            element={
              <HomePage
                data={data}
                schedule={schedule}
                grades={grades}
                attendance={attendance}
                refreshData={() => refreshData(data)}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProfilePage
                data={data}
                payment={payment}
                refreshData={() => refreshData(data)}
              />
            }
          />

          <Route
            path="/schedule"
            element={<SchedulePage schedule={schedule} />}
          />

          <Route path="/grades" element={<GradesPage grades={grades} />} />

          <Route
            path="/attendance"
            element={<AttendancePage attendance={attendance} />}
          />
        </Route>
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
