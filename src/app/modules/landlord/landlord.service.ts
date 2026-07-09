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
const getDashboardStats = async (landlordId: string) => {
  const [
    totalProperties,
    availableProperties,
    rentedProperties,
    activeRentals,
    earnings,
  ] = await Promise.all([
    prisma.property.count({
      where: {
        landlordId,
      },
    }),

    prisma.property.count({
      where: {
        landlordId,
        isAvailable: true,
      },
    }),

    prisma.property.count({
      where: {
        landlordId,
        isAvailable: false,
      },
    }),

    prisma.rental.count({
      where: {
        property: {
          landlordId,
        },
        status: "ACTIVE",
      },
    }),

    prisma.payment.aggregate({
      where: {
        status: "PAID",
        property: {
          landlordId,
        },
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalProperties,
    availableProperties,
    rentedProperties,
    activeRentals,
    totalEarnings: earnings._sum.amount || 0,
  };
};


export const LandlordService = {
  getMyProperties,
  getRentalRequests,
  updateRentalStatus,
  updateAvailability,
   getDashboardStats
};