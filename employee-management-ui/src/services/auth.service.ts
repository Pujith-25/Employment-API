import axios from "axios";

import type {
  LoginRequest,
  LoginResponse
} from "../types/auth.types";

const API_URL =
  "http://localhost:3000/auth";

export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse> => {

  const response =
    await axios.post(
      `${API_URL}/login`,
      data
    );

  return response.data;
};