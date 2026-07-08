import prisma from "../../config/prisma";

const getMyProperties = async (landlordId: string) => {
  return prisma.property.findMany({
    where: {
      landlordId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getRentalRequests = async (landlordId: string) => {
  return prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId,
      },
    },
    include: {
      tenant: true,
      property: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateRentalStatus = async (
  rentalId: string,
  status: "APPROVED" | "REJECTED"
) => {
  return prisma.rentalRequest.update({
    where: {
      id: rentalId,
    },
    data: {
      status,
    },
  });
};

const updateAvailability = async (
  propertyId: string,
  isAvailable: boolean
) => {
  return prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      isAvailable,
    },
  });
};

export const LandlordService = {
  getMyProperties,
  getRentalRequests,
  updateRentalStatus,
  updateAvailability,
};