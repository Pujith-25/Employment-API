import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createSalesman = async (
  req: Request,
  res: Response
) => {
  try {

    const { fullName } = req.body;

    const salesman =
      await prisma.salesman.create({
        data: {
          fullName
        }
      });

    res.status(201).json(salesman);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getSalesmen = async (
  req: Request,
  res: Response
) => {

  try {

    const salesmen =
      await prisma.salesman.findMany();

    res.json(salesmen);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const getSalesmanById = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const salesman =
      await prisma.salesman.findUnique({
        where: {
          id
        }
      });

    if (!salesman) {
      return res.status(404).json({
        message: "Salesman not found"
      });
    }

    res.json(salesman);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const updateSalesman = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const { fullName } =
      req.body;

    const salesman =
      await prisma.salesman.update({
        where: {
          id
        },
        data: {
          fullName
        }
      });

    res.json(salesman);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const deleteSalesman = async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    await prisma.salesman.delete({
      where: {
        id
      }
    });

    res.json({
      message: "Salesman deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};