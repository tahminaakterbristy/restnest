import auth from "../../middlewares/auth";
import router from "../auth/auth.route";
import { UserController } from "./user.controller";




router.patch(
  "/profile",
  auth("TENANT", "LANDLORD", "ADMIN"),
  UserController.updateProfile
);