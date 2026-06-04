import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createOrder = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      customerId,
      salesmanId,
      carId,
      quantity
    } = req.body;

    const order =
      await prisma.order.create({
        data: {
          customerId,
          salesmanId,
          carId,
          quantity
        },
        include: {
          customer: true,
          salesman: true,
          car: true
        }
      });

    res.status(201).json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getOrders = async (
  req: Request,
  res: Response
) => {

  try {

    const orders =
      await prisma.order.findMany({
        include: {
          customer: true,
          salesman: true,
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

export const getOrderById = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const order =
      await prisma.order.findUnique({
        where: {
          id
        },
        include: {
          customer: true,
          salesman: true,
          car: true
        }
      });

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const updateOrder = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const {
      customerId,
      salesmanId,
      carId,
      quantity
    } = req.body;

    const order =
      await prisma.order.update({
        where: {
          id
        },
        data: {
          customerId,
          salesmanId,
          carId,
          quantity
        },
        include: {
          customer: true,
          salesman: true,
          car: true
        }
      });

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const deleteOrder = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    await prisma.order.delete({
      where: {
        id
      }
    });

    res.json({
      message: "Order deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};