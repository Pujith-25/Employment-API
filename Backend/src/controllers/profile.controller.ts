import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getProfile = async (
  req: Request,
  res: Response
) => {

  try {

    const userId =
      (req as any).userId;

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId
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

    res.json({
      id: user.id,
      username: user.username,
      role: user.role.name,
      createdAt: user.createdAt
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};