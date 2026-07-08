import prisma from "../../config/prisma";
import { hashPassword } from "../../utils/bcrypt";
import { createToken } from "../../utils/jwt";
import bcrypt from "bcrypt";
import config from "../../config/config"

const registerUser = async (payload: any) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  return user;
};

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const matched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!matched) {
    throw new Error("Password doesn't match");
  }

  const token = createToken(
  {
    id: user.id,
    email: user.email,
    role: user.role,
  },
  config.jwt_secret,
  config.jwt_expires
);

  return {
    token,
    user,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};