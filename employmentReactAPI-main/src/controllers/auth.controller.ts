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
      email,
      password
    } = req.body;

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
        message: "User already exists"
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
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
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

export const login = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          email
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
        process.env.JWT_SECRET as string,
        {
          expiresIn: "15m"
        }
      );

    const refreshToken =
      jwt.sign(
        {
          userId: user.id
        },
        process.env.REFRESH_TOKEN_SECRET as string,
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

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
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

export const refreshAccessToken = async (
  req: Request,
  res: Response
) => {
  try {

    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required"
      });
    }

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
        message: "Invalid refresh token"
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    const accessToken =
      jwt.sign(
        {
          userId: user.id,
          role: user.role.name
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "15m"
        }
      );

    res.status(200).json({
      accessToken
    });

  } catch (error) {

    console.error(error);

    res.status(403).json({
      message: "Invalid refresh token"
    });

  }
};

export const logout = async (
  req: Request,
  res: Response
) => {
  try {

    const userId =
      (req as any).userId;

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken: null
      }
    });

    res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};