import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCategory = async (payload: { name: string }) => {
  const exists = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (exists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Category already exists"
    );
  }

  return prisma.category.create({
    data: payload,
  });
};

const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const CategoryService = {
  createCategory,
  getCategories,
};