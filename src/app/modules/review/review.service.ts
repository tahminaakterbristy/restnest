import prisma from "../../config/prisma";

const createReview = async (
  tenantId: string,
  payload: {
    propertyId: string;
    rating: number;
    comment: string;
  }
) => {
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