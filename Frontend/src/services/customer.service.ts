import axios from "axios";

const API_URL =
  "http://localhost:3000/customers";

const getHeaders = () => ({
  Authorization:
    `Bearer ${localStorage.getItem("token")}`
});

export const getCustomers =
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

export const createCustomer =
  async (
    customer: {
      fullName: string;
      phone: string;
      city: string;
    }
  ) => {

    const response =
      await axios.post(
        API_URL,
        customer,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };

export const deleteCustomer =
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

export const updateCustomer =
  async (
    id: number,
    customer: {
      fullName: string;
      phone: string;
      city: string;
    }
  ) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        customer,
        {
          headers:
            getHeaders()
        }
      );

    return response.data;
  };
  export const getCustomersForDropdown =
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