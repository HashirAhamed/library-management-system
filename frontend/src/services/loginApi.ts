import axios from "axios";
import type { LoginRequest, RegisterRequest } from "../types/user";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export async function loginUser(credentials: LoginRequest): Promise<string> {
  const response = await api.post<string>("/User/login", credentials);
  const token = response.data;

  if (!token || typeof token !== "string") {
    throw new Error("Invalid token received from server");
  }

  return token;
}

export async function registerUser(data: RegisterRequest): Promise<string> {
  const response = await api.post<string>("/User/register", data);
  return response.data;
}

export default api;