import { VITE_API_URL } from "../utils/constants";
import type { SignupCredentials, LoginCredentials } from "../utils/types";
import axios from "axios";

type ApiError = {
  error?: string;
  message?: string;
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiError>(error)) {
    return (
      error.response?.data?.message || error.response?.data?.error || error.message || fallback
    );
  }
  return fallback;
};

export const signUp = async ({ email, username, password }: SignupCredentials) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/signup`, {
      email,
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Signup failed"));
  }
};

export const login = async ({ username, password }: LoginCredentials) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Login failed"));
  }
};
