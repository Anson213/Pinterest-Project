import axios from 'axios';
import { refreshAccessToken, logout } from './authAxios';

const BASE_URL = 'https://api.example.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      accessToken = await refreshAccessToken(); // Attempt to refresh
      if (!accessToken) {
        logout(); // If refresh fails, logout user
        return Promise.reject(new Error('Unauthorized'));
      }
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Errors (Token Expired)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;

      // Prevent infinite loop by checking retry flag
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken();

        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest); // Retry request with new token
        }
      }

      logout(); // If refresh failed, logout user
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
