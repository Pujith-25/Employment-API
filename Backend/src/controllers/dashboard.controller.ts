import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {

  try {

    const customers =
      await prisma.customer.count();

    const cars =
      await prisma.car.count();

    const salesmen =
      await prisma.salesman.count();

    const orders =
      await prisma.order.count();

    res.json({
      customers,
      cars,
      salesmen,
      orders
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};