import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createCar = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      brand,
      model,
      price,
      stock
    } = req.body;

    if (
      !brand ||
      !model ||
      price === undefined ||
      price === null ||
      stock === undefined ||
      stock === null
    ) {
      return res.status(400).json({
        message:
          "brand, model, price and stock are required"
      });
    }

    const car =
      await prisma.car.create({
        data: {
          brand,
          model,
          price: Number(price),
          stock: Number(stock)
        }
      });

    res.status(201).json(car);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const getCars = async (
  req: Request,
  res: Response
) => {

  try {

    const cars =
      await prisma.car.findMany();

    res.json(cars);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const getCarById = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const car =
      await prisma.car.findUnique({
        where: {
          id
        }
      });

    if (!car) {
      return res.status(404).json({
        message: "Car not found"
      });
    }

    res.json(car);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const updateCar = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const {
      brand,
      model,
      price,
      stock
    } = req.body;

    const car =
      await prisma.car.update({
        where: {
          id
        },
        data: {
          brand,
          model,
          price,
          stock
        }
      });

    res.json(car);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const deleteCar = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    await prisma.car.delete({
      where: {
        id
      }
    });

    res.json({
      message: "Car deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};