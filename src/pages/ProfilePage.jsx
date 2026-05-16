import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://school-diary-v4m0.onrender.com";

const ProfilePage = ({ data, payment = [] }) => {
  const [user, setUser] = useState(null);
  const [showPayments, setShowPayments] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  const avatarURL = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${BASE_URL}${user.avatar}?v=${user?.updated_at || Date.now()}`
    : null;

  const handleImage = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  async function updateProfile() {
    const access_token = localStorage.getItem("access_token");

    const formData = new FormData();
    formData.append("username", user?.username);
    formData.append("email", user?.email);
    formData.append("student_class", user?.student_class);

    if (file) {
      formData.append("avatar", file);
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        `${BASE_URL}/api/user-info/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 🔥 ВАЖНО: принудительно ломаем кеш аватарки
      setUser({
        ...res.data,
        avatar: res.data.avatar
          ? `${res.data.avatar}?v=${Date.now()}`
          : null,
      });

      setFile(null);
      setPreview(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const hasDebt = payment.some((p) => !p.paid);

  return (
    <main className="profile-page">
      <h1>👤 Профиль</h1>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="avatar-wrapper">
          <img
            src={preview || avatarURL}
            alt="avatar"
            onClick={() => setOpenAvatar(true)}
            className="avatar"
          />

          <label className="avatar-upload">
            +
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />
          </label>
        </div>

        <div>
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
          <p>Класс: {user?.student_class}</p>
        </div>
      </div>

      {/* SAVE */}
      <button
        onClick={updateProfile}
        disabled={loading}
        className="btn primary"
      >
        {loading ? "Сохранение..." : "💾 Сохранить изменения"}
      </button>

      {/* DEBT */}
      {hasDebt && (
        <div className="warning">⚠️ Есть неоплаченные месяцы</div>
      )}

      {/* PAYMENTS */}
      <button
        onClick={() => setShowPayments(!showPayments)}
        className="btn success"
      >
        💳 {showPayments ? "Скрыть платежи" : "Показать платежи"}
      </button>

      {showPayments && (
        <div className="payments-grid">
          {payment.map((p) => (
            <div key={p.id} className="payment-card">
              <h3>{p.month}</h3>
              <p>{p.date_pay}</p>
              <span className={p.paid ? "status-paid" : "status-debt"}>
                {p.paid ? "Оплачено" : "Долг"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {openAvatar && (
        <div
          className="avatar-modal"
          onClick={() => setOpenAvatar(false)}
        >
          <img src={preview || avatarURL} alt="avatar" />
        </div>
      )}
    </main>
  );
};

export default ProfilePage;