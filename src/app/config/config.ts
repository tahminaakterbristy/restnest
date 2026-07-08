import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET as string,
  jwt_expires: process.env.JWT_EXPIRES as string,
  bcrypt_salt: Number(process.env.BCRYPT_SALT),
};

export default config;