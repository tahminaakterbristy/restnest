import prisma from "../../config/prisma";

const updateProfile = async (
  userId: string,
  payload: {
    name?: string;
    phone?: string;
    profilePhoto?: string;
  }
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
  });
};

export const UserService = {
  updateProfile,
};