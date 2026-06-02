import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      salary,
      departmentId
    } = req.body;

    const employee =
      await prisma.employee.create({
        data: {
          firstName,
          lastName,
          email,
          salary,
          departmentId
        }
      });

    res.status(201).json(employee);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getEmployees = async (
  req: Request,
  res: Response
) => {
  try {

    const employees =
      await prisma.employee.findMany({
        include: {
          department: true
        }
      });

    res.json(employees);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    const employee =
      await prisma.employee.findUnique({
        where: {
          id
        },
        include: {
          department: true
        }
      });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.json(employee);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    const {
      firstName,
      lastName,
      email,
      salary,
      departmentId
    } = req.body;

    const employee =
      await prisma.employee.update({
        where: {
          id
        },
        data: {
          firstName,
          lastName,
          email,
          salary,
          departmentId
        }
      });

    res.json(employee);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    await prisma.employee.delete({
      where: {
        id
      }
    });

    res.json({
      message: "Employee deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};