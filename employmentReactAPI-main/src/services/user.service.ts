import prisma from "../config/prisma";

export const getUsers = async () => {

  return prisma.user.findMany();

};