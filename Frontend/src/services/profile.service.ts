import axios from "axios";


const API_URL =
  "http://localhost:3000/auth";

const getHeaders = () => ({
  Authorization:
    `Bearer ${localStorage.getItem("token")}`
});

export const changePassword =
  async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {

    const response =
      await axios.post(
        `${API_URL}/change-password`,
        {
          currentPassword,
          newPassword,
          confirmPassword
        },
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };
export const getProfile =
  async () => {

    const response =
      await axios.get(
        "http://localhost:3000/profile",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

    return response.data;
  };