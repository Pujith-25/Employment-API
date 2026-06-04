import axios from "axios";

const API_URL =
  "http://localhost:3000/dashboard/stats";

export const getDashboardStats =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

    return response.data;
  };