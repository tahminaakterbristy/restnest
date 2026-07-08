import prisma from "../../config/prisma";

const createRentalRequest = async (
  tenantId: string,
  payload: {
    propertyId: string;
    moveInDate: string;
  }
) => {
  return prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      moveInDate: new Date(payload.moveInDate),
      status: "PENDING",
    },
    include: {
      tenant: true,
      property: true,
    },
  });
};

const getRentalRequests = async () => {
  return prisma.rentalRequest.findMany({
    include: {
      tenant: true,
      property: true,
    },
  });
};

const updateRentalStatus = async (
  id: string,
  status: "APPROVED" | "REJECTED"
) => {
  return prisma.rentalRequest.update({
    where: { id },
    data: { status },
  });
};

export const RentalService = {
  createRentalRequest,
  getRentalRequests,
  updateRentalStatus,
};