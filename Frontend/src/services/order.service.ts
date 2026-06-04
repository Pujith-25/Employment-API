import axios from "axios";

const API_URL =
  "http://localhost:3000/orders";

const getHeaders = () => ({
  Authorization:
    `Bearer ${localStorage.getItem("token")}`
});

export const getOrders =
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

export const createOrder =
  async (
    order: {
      customerId: number;
      salesmanId: number;
      carId: number;
      quantity: number;
    }
  ) => {

    const response =
      await axios.post(
        API_URL,
        order,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };

export const deleteOrder =
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