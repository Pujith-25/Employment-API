import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer
} from "../services/customer.service";

const CustomersPage = () => {

  const [customers, setCustomers] =
    useState<any[]>([]);

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const loadCustomers =
    async () => {

      const data =
        await getCustomers();

      setCustomers(data);
    };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSave =
    async () => {

      if (editingId) {

        await updateCustomer(
          editingId,
          {
            fullName,
            phone,
            city
          }
        );

        setEditingId(null);

      } else {

        await createCustomer({
          fullName,
          phone,
          city
        });

      }

      setFullName("");
      setPhone("");
      setCity("");

      loadCustomers();
    };

  const handleDelete =
    async (
      id: number
    ) => {

      await deleteCustomer(id);

      loadCustomers();
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
          Customers
        </h1>

        <div
          className="
          flex
          gap-2
          mb-6"
        >

          <input
            placeholder="Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="
            border
            p-2"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="
            border
            p-2"
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
            className="
            border
            p-2"
          />

          <button
            onClick={handleSave}
            className="
            bg-blue-600
            text-white
            px-4"
          >
            {
              editingId
                ? "Update"
                : "Add"
            }
          </button>

        </div>

        <table
          className="
          border
          w-full"
        >

          <thead>

            <tr>

              <th>Name</th>

              <th>Phone</th>

              <th>City</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {customers.map(
              (customer) => (
                <tr
                  key={
                    customer.id
                  }
                >

                  <td>
                    {customer.fullName}
                  </td>

                  <td>
                    {customer.phone}
                  </td>

                  <td>
                    {customer.city}
                  </td>

                  <td>

                    <button
                      onClick={() => {

                        setEditingId(
                          customer.id
                        );

                        setFullName(
                          customer.fullName
                        );

                        setPhone(
                          customer.phone
                        );

                        setCity(
                          customer.city
                        );

                      }}
                      className="
                      bg-green-600
                      text-white
                      px-3
                      mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          customer.id
                        )
                      }
                      className="
                      bg-red-500
                      text-white
                      px-3"
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

export default CustomersPage;