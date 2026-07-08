import bcrypt from "bcrypt";
import config from "../config/config";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, Number(config.bcryptSalt));
};

export const comparePassword = async (
  plain: string,
  hashed: string
) => {
  return bcrypt.compare(plain, hashed);
};