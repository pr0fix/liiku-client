import { VITE_API_URL } from "../utils/constants";
import type { SignupCredentials, LoginCredentials } from "../utils/types";
import axios from "axios";

export const signUp = async ({
  email,
  username,
  password,
}: SignupCredentials) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/signup`, {
      email,
      username,
      password,
    });

    return response.data;
  } catch (error) {
    // TODO: error handling
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
    // TODO: error handling
  }
};
