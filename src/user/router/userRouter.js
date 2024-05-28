import express from "express";
import { dependency } from "../settings/user.config.js";
import { check } from "express-validator";
import passport from "../../../configurations/authentication.js";

const validate = [
  check("user_name")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("user_password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least one letter"),
];

const { controller } = dependency();

const userRouter = express.Router();

userRouter.get("/user", async (req, res) => controller.readUser(req, res));

userRouter.post("/user/create", validate, async (req, res) =>
  controller.createUser(req, res)
);

userRouter.get("/user/read/:id", async (req, res) =>
  controller.readUserByID(req, res)
);

userRouter.get("/user/profile/:id", async (req, res) =>
  controller.readUserByID(req, res)
);

userRouter.get("/user/category/:category_name", async (req, res) =>
  controller.getCategoryCandidate(req, res)
);

userRouter.get("/user/voteprice/:user_id", async (req, res) =>
  controller.getPricePerVote(req, res)
);

userRouter.get("/user/edit/:user_id", async (req, res) =>
  controller.editUser(req, res)
);

userRouter.put("/user/update", async (req, res) =>
  controller.updateUser(req, res)
);

userRouter.post(
  "/user/signin",
  passport.authenticate("local"),
  async (req, res) => controller.signInUser(req, res)
);

userRouter.post("/user/username", async (req, res) =>
  controller.getUserByUsername(req, res)
);

userRouter.post(
  "/otp/create",
  async (req, res) => controller.createOTP(req, res) // new accounts
);

userRouter.post(
  "/otp/verify",
  async (req, res) => controller.checkOTP(req, res) // new accounts
);

userRouter.post(
  "/verification/create",
  async (req, res) => controller.createVerificationCode(req, res) //forgot password
);

userRouter.post(
  "/verification/verify",
  async (req, res) => controller.checkVerificationCode(req, res) //forgot password
);

userRouter.delete("/logout/user", async (req, res) =>
  controller.logOutUser(req, res)
);

userRouter.post("/user/updatepassword", async (req, res) =>
  controller.updatePassword(req, res)
);

userRouter.delete("/user/delete/:id", async (req, res) =>
  controller.deleteUser(req, res)
);

export default userRouter;
