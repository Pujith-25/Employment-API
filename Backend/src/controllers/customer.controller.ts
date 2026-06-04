import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      phone,
      city
    } = req.body;

    const customer =
      await prisma.customer.create({
        data: {
          fullName,
          phone,
          city
        }
      });

    res.status(201).json(customer);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getCustomers = async (
  req: Request,
  res: Response
) => {

  try {

    const customers =
      await prisma.customer.findMany();

    res.json(customers);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const getCustomerById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const customer =
      await prisma.customer.findUnique({
        where: {
          id
        }
      });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.json(customer);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const updateCustomer = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const {
      fullName,
      phone,
      city
    } = req.body;

    const customer =
      await prisma.customer.update({
        where: { id },
        data: {
          fullName,
          phone,
          city
        }
      });

    res.json(customer);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const deleteCustomer = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    await prisma.customer.delete({
      where: { id }
    });

    res.json({
      message: "Customer deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};