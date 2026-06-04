import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      username,
      password,
      roleName
    } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          username
        }
      });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    const role =
      await prisma.role.findUnique({
        where: {
          name: roleName
        }
      });

    if (!role) {
      return res.status(404).json({
        message: "Role not found"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          roleId: role.id
        },
        include: {
          role: true
        }
      });

    res.status(201).json({
      message: "User created",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      username,
      password
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          username
        },
        include: {
          role: true
        }
      });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const accessToken =
      jwt.sign(
        {
          userId: user.id,
          role: user.role.name
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "15m"
        }
      );

    const refreshToken =
      jwt.sign(
        {
          userId: user.id
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
          expiresIn: "7d"
        }
      );

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken
      }
    });

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role.name
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const refreshAccessToken =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const { refreshToken } =
        req.body;

      const user =
        await prisma.user.findFirst({
          where: {
            refreshToken
          },
          include: {
            role: true
          }
        });

      if (!user) {
        return res.status(403).json({
          message:
            "Invalid refresh token"
        });
      }

      jwt.verify(
        refreshToken,
        process.env
          .REFRESH_TOKEN_SECRET!
      );

      const accessToken =
        jwt.sign(
          {
            userId: user.id,
            role: user.role.name
          },
          process.env.JWT_SECRET!,
          {
            expiresIn: "15m"
          }
        );

      res.json({
        accessToken
      });

    } catch {

      res.status(403).json({
        message:
          "Invalid refresh token"
      });

    }

  };

export const logout = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = (req as any).userId;

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken: null
      }
    });

    res.json({
      message:
        "Logout successful"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server Error"
    });

  }

};