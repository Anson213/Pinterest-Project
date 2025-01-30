import axios from 'axios';

const BASE_URL = 'https://api.example.com';

const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login Request function
export const login = async (email, password) => {
  return authAxios.post('/auth/login', { email, password });
};

// Register Request function
export const register = async (userData) => {
  return authAxios.post('/auth/register', userData);
};

// Logout Request function
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login'; // Redirect to login page
};

// Refresh Token Request function
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    logout();
    return null;
  }
  
  try {
    const { data } = await authAxios.post('/auth/refresh', { refresh_token: refreshToken });
    localStorage.setItem('access_token', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    logout();
    return null;
  }
};

export default authAxios;