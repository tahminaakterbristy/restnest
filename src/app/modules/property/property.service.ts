import prisma from "../../config/prisma";

const createProperty = async (payload: any, landlordId: string) => {
  return prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });
};

const getProperties = async () => {
  return prisma.property.findMany({
    include: {
      category: true,
      landlord: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleProperty = async (id: string) => {
  return prisma.property.findUnique({
    where: { id },
    include: {
      category: true,
      landlord: true,
    },
  });
};

const updateProperty = async (
  id: string,
  payload: any,
  landlordId: string
) => {
  return prisma.property.update({
    where: {
      id,
      landlordId,
    },
    data: payload,
  });
};

const deleteProperty = async (
  id: string,
  landlordId: string
) => {
  return prisma.property.delete({
    where: {
      id,
      landlordId,
    },
  });
};

export const PropertyService = {
  createProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};