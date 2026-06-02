import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";

export const createUser = async (
  req: Request,
  res: Response
) => {
  try {

    const { username, email, password } = req.body;

    const existingUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            { username },
            { email }
          ]
        }
      });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or Email already exists"
      });
    }

    const employeeRole =
      await prisma.role.findUnique({
        where: {
          name: "EMPLOYEE"
        }
      });

    if (!employeeRole) {
      return res.status(500).json({
        message: "EMPLOYEE role not found"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          roleId: employeeRole.id
        },
        include: {
          role: true
        }
      });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role.name
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {

    const users =
      await prisma.user.findMany({
        include: {
          role: true
        }
      });

    res.json(users);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const getUserById = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    const user =
      await prisma.user.findUnique({
        where: {
          id
        },
        include: {
          role: true
        }
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    const {
      username,
      email
    } = req.body;

    const user =
      await prisma.user.update({
        where: {
          id
        },
        data: {
          username,
          email
        },
        include: {
          role: true
        }
      });

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    await prisma.user.delete({
      where: {
        id
      }
    });

    res.json({
      message: "User deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};