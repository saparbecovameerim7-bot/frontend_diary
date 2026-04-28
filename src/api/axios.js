import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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
        "http://127.0.0.1:8000/api/token/refresh/",
        { refresh: refresh }
      );

      localStorage.setItem("access_token", response.data.access_token);
        
      originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
      return API(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default API;
