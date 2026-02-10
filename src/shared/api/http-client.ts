import axios from 'axios';
import { apiURL } from './api-url';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8080';

export const apiBaseURL = `${API_BASE_URL}/api/v1`;

export const AUTH_TOKEN_KEY = 'access_token';
export const AUTH_REFRESH_TOKEN_KEY = 'refresh_token';
export const AUTH_USER_ID_KEY = 'userId';

export const http = axios.create({
  baseURL: apiBaseURL + '/',
  headers: { 'Content-Type': 'application/json' },
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;
  try {
    const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(
      `${apiBaseURL}/${apiURL.auth.refresh}`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );
    localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken);
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, data.refreshToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

function clearAllCookies() {
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}

export function clearAuthAndRedirect() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_ID_KEY);
  localStorage.removeItem('accessToken');
  clearAllCookies();
  window.location.replace('/');
}

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401) return Promise.reject(error);
    if (originalRequest.url?.includes('auth/refresh')) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }
    if (originalRequest._retried) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }
    if (!refreshPromise) refreshPromise = refreshAccessToken();
    const newToken = await refreshPromise;
    refreshPromise = null;
    if (newToken) {
      originalRequest._retried = true;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return http(originalRequest);
    }
    clearAuthAndRedirect();
    return Promise.reject(error);
  }
);
