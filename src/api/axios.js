import axios from "axios";

const API = axios.create({
  baseURL: "https://school-diary-v4m0.onrender.com/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh_token");

      const response = await axios.post(
        "https://school-diary-v4m0.onrender.com/api/token/refresh/",
        { refresh: refresh }
      );

      localStorage.setItem("access_token", response.data.access);
        
      originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
      return API(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default API;
