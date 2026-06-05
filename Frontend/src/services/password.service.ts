import axios from "axios";

const API_URL =
  "http://localhost:3000/auth";

export const forgotPassword =
  async (
    username: string
  ) => {

    const response =
      await axios.post(
        `${API_URL}/forgot-password`,
        {
          username
        }
      );

    return response.data;
  };

export const resetPassword =
  async (
    resetToken: string,
    newPassword: string
  ) => {

    const response =
      await axios.post(
        `${API_URL}/reset-password`,
        {
          resetToken,
          newPassword
        }
      );

    return response.data;
  };