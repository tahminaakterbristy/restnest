import prisma from "../../config/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateUserStatus = async (
  id: string,
  isBlocked: boolean
) => {
  return prisma.user.update({
    where: { id },
    data: {
      isBlocked,
    },
  });
};

const getAllProperties = async () => {
  return prisma.property.findMany({
    include: {
      landlord: true,
      category: true,
    },
  });
};

const getAllRentals = async () => {
  return prisma.rentalRequest.findMany({
    include: {
      tenant: true,
      property: true,
    },
  });
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentals,
};