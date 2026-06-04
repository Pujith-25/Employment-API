import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getMyOrders = async (
  req: Request,
  res: Response
) => {

  try {

    const username =
      req.headers.username as string;

    const salesman =
      await prisma.salesman.findFirst({
        where: {
          fullName: username
        }
      });

    if (!salesman) {
      return res.json([]);
    }

    const orders =
      await prisma.order.findMany({
        where: {
          salesmanId: salesman.id
        },
        include: {
          customer: true,
          car: true
        }
      });

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};