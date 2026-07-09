import prisma from "../../config/prisma";


const createProperty = async (payload: any, landlordId: string) => {
  return prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });
};

const getProperties = async (query: any) => {
  const {
    search,
    city,
    category,
    minRent,
    maxRent,
    page = 1,
    limit = 10,
    sort = "createdAt",
    sortOrder = "desc",
  } = query;

  const where: Prisma.PropertyWhereInput = {};

  // Search
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        city: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // City Filter
  if (city) {
    where.city = city;
  }

  // Category Filter
  if (category) {
    where.category = {
      name: category,
    };
  }

  // Rent Filter
  if (minRent || maxRent) {
    where.rent = {};

    if (minRent) {
      where.rent.gte = Number(minRent);
    }

    if (maxRent) {
      where.rent.lte = Number(maxRent);
    }
  }

  const result = await prisma.property.findMany({
    where,

    include: {
      category: true,
      landlord: true,
    },

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),

    orderBy: {
      [sort]: sortOrder,
    },
  });

  const total = await prisma.property.count({
    where,
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },

    data: result,
  };
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