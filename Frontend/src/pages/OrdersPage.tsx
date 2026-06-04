import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getOrders,
  createOrder,
  deleteOrder
} from "../services/order.service";

import {
  getCustomersForDropdown
} from "../services/customer.service";

import {
  getSalesmenForDropdown
} from "../services/salesman.service";

import {
  getCarsForDropdown
} from "../services/car.service";

const OrdersPage = () => {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [customers, setCustomers] =
    useState<any[]>([]);

  const [salesmen, setSalesmen] =
    useState<any[]>([]);

  const [cars, setCars] =
    useState<any[]>([]);

  const [customerId, setCustomerId] =
    useState("");

  const [salesmanId, setSalesmanId] =
    useState("");

  const [carId, setCarId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const loadData =
    async () => {

      const orderData =
        await getOrders();

      const customerData =
        await getCustomersForDropdown();

      const salesmanData =
        await getSalesmenForDropdown();

      const carData =
        await getCarsForDropdown();

      setOrders(orderData);
      setCustomers(customerData);
      setSalesmen(salesmanData);
      setCars(carData);
    };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd =
    async () => {

      await createOrder({
        customerId:
          Number(customerId),

        salesmanId:
          Number(salesmanId),

        carId:
          Number(carId),

        quantity:
          Number(quantity)
      });

      loadData();
    };

  const handleDelete =
    async (
      id: number
    ) => {

      await deleteOrder(id);

      loadData();
    };

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1
          className="
          text-3xl
          font-bold
          mb-6"
        >
          Orders
        </h1>

        <div
          className="
          flex
          gap-2
          mb-6"
        >

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
            }
          >

            <option>
              Customer
            </option>

            {customers.map(
              (customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.fullName}
                </option>
              )
            )}

          </select>

          <select
            value={salesmanId}
            onChange={(e) =>
              setSalesmanId(
                e.target.value
              )
            }
          >

            <option>
              Salesman
            </option>

            {salesmen.map(
              (salesman) => (
                <option
                  key={salesman.id}
                  value={salesman.id}
                >
                  {salesman.fullName}
                </option>
              )
            )}

          </select>

          <select
            value={carId}
            onChange={(e) =>
              setCarId(
                e.target.value
              )
            }
          >

            <option>
              Car
            </option>

            {cars.map(
              (car) => (
                <option
                  key={car.id}
                  value={car.id}
                >
                  {car.brand}
                  {" "}
                  {car.model}
                </option>
              )
            )}

          </select>

          <input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
          />

          <button
            onClick={handleAdd}
          >
            Add
          </button>

        </div>

        <table
          className="
          border
          w-full"
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Customer</th>

              <th>Salesman</th>

              <th>Car</th>

              <th>Quantity</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map(
              (order) => (
                <tr
                  key={order.id}
                >

                  <td>
                    {order.id}
                  </td>

                  <td>
                    {order.customer.fullName}
                  </td>

                  <td>
                    {order.salesman.fullName}
                  </td>

                  <td>
                    {order.car.brand}
                    {" "}
                    {order.car.model}
                  </td>

                  <td>
                    {order.quantity}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        handleDelete(
                          order.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    </>
  );
};

export default OrdersPage;