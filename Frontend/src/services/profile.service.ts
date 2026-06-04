import axios from "axios";

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