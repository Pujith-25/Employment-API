import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createDepartment = async (
  req: Request,
  res: Response
) => {

  console.log("BODY:", req.body);

  try {

    console.log("HEADERS:", req.headers);
console.log("BODY:", req.body);

if (!req.body) {
  return res.status(400).json({
    message: "Request body missing"
  });
}

const { name } = req.body;

    const department =
      await prisma.department.create({
        data: {
          name
        }
      });

    res.status(201).json(department);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getDepartments = async (
  req: Request,
  res: Response
) => {
  try {

    const departments =
      await prisma.department.findMany();

    res.json(departments);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response
) => {
  try {

    const id =
      Number(req.params.id);

    const department =
      await prisma.department.findUnique({
        where: {
          id
        }
      });

    if (!department) {
      return res.status(404).json({
        message:
          "Department not found"
      });
    }

    res.json(department);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const updateDepartment = async (
  req: Request,
  res: Response
) => {
  try {

    const id =
      Number(req.params.id);

    const { name } = req.body;

    const department =
      await prisma.department.update({
        where: {
          id
        },
        data: {
          name
        }
      });

    res.json(department);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response
) => {
  try {

    const id =
      Number(req.params.id);

    await prisma.department.delete({
      where: {
        id
      }
    });

    res.json({
      message:
        "Department deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};