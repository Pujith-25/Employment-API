import axios from "axios";

const API_URL =
  "http://localhost:3000/cars";

const getHeaders = () => ({
  Authorization:
    `Bearer ${localStorage.getItem("token")}`
});

export const getCars =
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

export const createCar =
  async (
    car: {
      brand: string;
      model: string;
      price: number;
      stock: number;
    }
  ) => {

    const response =
      await axios.post(
        API_URL,
        car,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };

export const updateCar =
  async (
    id: number,
    car: {
      brand: string;
      model: string;
      price: number;
      stock: number;
    }
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        car,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };

export const deleteCar =
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
  export const getCarsForDropdown =
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