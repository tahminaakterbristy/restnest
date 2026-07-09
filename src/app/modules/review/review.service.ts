import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";

const createReview = async (
  tenantId: string,
  payload: {
    propertyId: string;
    rating: number;
    comment: string;
  }
) => {
  const completedRental = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status: "COMPLETED",
    },
  });

  if (!completedRental) {
    throw new AppError(
      403,
      "You can review only after completing your rental."
    );
  }

  return prisma.review.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });
};

const getReviews = async (propertyId: string) => {
  return prisma.review.findMany({
    where: {
      propertyId,
    },
    include: {
      tenant: true,
    },
  });
};

export const ReviewService = {
  createReview,
  getReviews,
};