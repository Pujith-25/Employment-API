import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getSalesmen,
  createSalesman,
  updateSalesman,
  deleteSalesman
} from "../services/salesman.service";

const SalesmenPage = () => {

  const [salesmen, setSalesmen] =
    useState<any[]>([]);

  const [fullName, setFullName] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const loadSalesmen =
    async () => {

      const data =
        await getSalesmen();

      setSalesmen(data);
    };

  useEffect(() => {
    loadSalesmen();
  }, []);

  const handleSave =
    async () => {

      if (editingId) {

        await updateSalesman(
          editingId,
          {
            fullName
          }
        );

        setEditingId(null);

      } else {

        await createSalesman({
          fullName
        });

      }

      setFullName("");

      loadSalesmen();
    };

  const handleDelete =
    async (
      id: number
    ) => {

      await deleteSalesman(id);

      loadSalesmen();
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
          Salesmen
        </h1>

        <div
          className="
          flex
          gap-2
          mb-6"
        >

          <input
            placeholder="Full Name"
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

              <th>ID</th>

              <th>Name</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {salesmen.map(
              (salesman) => (
                <tr
                  key={
                    salesman.id
                  }
                >

                  <td>
                    {salesman.id}
                  </td>

                  <td>
                    {salesman.fullName}
                  </td>

                  <td>

                    <button
                      onClick={() => {

                        setEditingId(
                          salesman.id
                        );

                        setFullName(
                          salesman.fullName
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
                          salesman.id
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

export default SalesmenPage;