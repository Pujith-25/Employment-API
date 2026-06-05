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

  const role =
    localStorage.getItem("role");

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

      try {

        const orderData =
          await getOrders();

        const customerData =
          await getCustomersForDropdown();

        const carData =
          await getCarsForDropdown();

        setOrders(orderData);
        setCustomers(customerData);
        setCars(carData);

        if (
          role === "ADMIN" ||
          role === "MANAGER"
        ) {

          const salesmanData =
            await getSalesmenForDropdown();

          setSalesmen(
            salesmanData
          );

        }

      } catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    loadData();

  }, []);

  const handleAdd =
    async () => {

      try {

        if (
          !customerId ||
          !carId ||
          !quantity
        ) {

          alert(
            "Please fill all fields"
          );

          return;
        }

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

        setCustomerId("");
        setSalesmanId("");
        setCarId("");
        setQuantity("");

        loadData();

      } catch (error) {

        console.error(error);

      }

    };

  const handleDelete =
    async (
      id: number
    ) => {

      try {

        await deleteOrder(id);

        loadData();

      } catch (error) {

        console.error(error);

      }

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
          mb-6
          flex-wrap"
        >

          <select
            value={customerId}
            onChange={(e) =>
              setCustomerId(
                e.target.value
              )
            }
            className="
            border
            p-2"
          >

            <option value="">
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

          {
            role !== "SALESMAN" && (

              <select
                value={salesmanId}
                onChange={(e) =>
                  setSalesmanId(
                    e.target.value
                  )
                }
                className="
                border
                p-2"
              >

                <option value="">
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

            )
          }

          <select
            value={carId}
            onChange={(e) =>
              setCarId(
                e.target.value
              )
            }
            className="
            border
            p-2"
          >

            <option value="">
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
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            className="
            border
            p-2"
          />

          <button
            onClick={handleAdd}
            className="
            bg-blue-600
            text-white
            px-4
            py-2"
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
                    {order.customer?.fullName}
                  </td>

                  <td>
                    {order.salesman?.fullName}
                  </td>

                  <td>
                    {order.car?.brand}
                    {" "}
                    {order.car?.model}
                  </td>

                  <td>
                    {order.quantity}
                  </td>

                  <td>

                    {
                      role === "ADMIN" && (

                        <button
                          onClick={() =>
                            handleDelete(
                              order.id
                            )
                          }
                          className="
                          bg-red-600
                          text-white
                          px-3
                          py-1"
                        >
                          Delete
                        </button>

                      )
                    }

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