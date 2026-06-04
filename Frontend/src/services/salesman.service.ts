import axios from "axios";

const API_URL =
  "http://localhost:3000/salesmen";

const getHeaders = () => ({
  Authorization:
    `Bearer ${localStorage.getItem("token")}`
});

export const getSalesmen =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };

export const createSalesman =
  async (
    salesman: {
      fullName: string;
    }
  ) => {

    const response =
      await axios.post(
        API_URL,
        salesman,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };

export const updateSalesman =
  async (
    id: number,
    salesman: {
      fullName: string;
    }
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        salesman,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };

export const deleteSalesman =
  async (
    id: number
  ) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };
  export const getSalesmenForDropdown =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };