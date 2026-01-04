import type { AuthResponse } from "../types/user.types";
import axiosInstance from "./axiosInstance";

export const loginApi = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>("/user/login", {
    email,
    password,
  });

  return res.data;
};
export const registerApi = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await axiosInstance.post<AuthResponse>("/user/register", {
    username,
    email,
    password,
  });

  return res.data;
};
