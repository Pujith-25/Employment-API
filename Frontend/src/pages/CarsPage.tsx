import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getCars,
  createCar,
  updateCar,
  deleteCar
} from "../services/car.service";

const CarsPage = () => {

  const role =
    localStorage.getItem("role");

  const [cars, setCars] =
    useState<any[]>([]);

  const [brand, setBrand] =
    useState("");

  const [model, setModel] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const loadCars =
    async () => {

      const data =
        await getCars();

      setCars(data);
    };

  useEffect(() => {
    loadCars();
  }, []);

  const handleSave =
    async () => {

      if (
        !brand ||
        !model ||
        !price ||
        !stock
      ) {
        alert(
          "Please fill all fields"
        );
        return;
      }

      const payload = {
        brand,
        model,
        price: Number(price),
        stock: Number(stock)
      };

      if (editingId) {

        await updateCar(
          editingId,
          payload
        );

        setEditingId(null);

      } else {

        await createCar(
          payload
        );

      }

      setBrand("");
      setModel("");
      setPrice("");
      setStock("");

      loadCars();
    };

  const handleDelete =
    async (
      id: number
    ) => {

      await deleteCar(id);

      loadCars();
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
          Cars
        </h1>

        {
          role !== "SALESMAN" && (
            <div
              className="
              flex
              gap-2
              mb-6"
            >

              <input
                placeholder="Brand"
                value={brand}
                onChange={(e) =>
                  setBrand(
                    e.target.value
                  )
                }
                className="
                border
                p-2"
              />

              <input
                placeholder="Model"
                value={model}
                onChange={(e) =>
                  setModel(
                    e.target.value
                  )
                }
                className="
                border
                p-2"
              />

              <input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                className="
                border
                p-2"
              />

              <input
                placeholder="Stock"
                type="number"
                value={stock}
                onChange={(e) =>
                  setStock(
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
          )
        }

        <table
          className="
          border
          w-full"
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Brand</th>

              <th>Model</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              cars.map(
                (car) => (
                  <tr
                    key={car.id}
                  >

                    <td>
                      {car.id}
                    </td>

                    <td>
                      {car.brand}
                    </td>

                    <td>
                      {car.model}
                    </td>

                    <td>
                      ₹{car.price}
                    </td>

                    <td>
                      {car.stock}
                    </td>

                    <td>

                      {
                        role !== "SALESMAN" && (
                          <button
                            onClick={() => {

                              setEditingId(
                                car.id
                              );

                              setBrand(
                                car.brand
                              );

                              setModel(
                                car.model
                              );

                              setPrice(
                                String(
                                  car.price
                                )
                              );

                              setStock(
                                String(
                                  car.stock
                                )
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
                        )
                      }

                      {
                        role === "ADMIN" && (
                          <button
                            onClick={() =>
                              handleDelete(
                                car.id
                              )
                            }
                            className="
                            bg-red-500
                            text-white
                            px-3"
                          >
                            Delete
                          </button>
                        )
                      }

                    </td>

                  </tr>
                )
              )
            }

          </tbody>

        </table>

      </div>

    </>
  );

};

export default CarsPage;