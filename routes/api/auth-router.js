import express from "express";

import { validateBody } from "../../decorators/index.js";

import userSchema from "../../schema/userSchema.js";

import authController from "../../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema.userSingUpSchema), authController.register)

authRouter.post("/login", validateBody(userSchema.userSingInSchema), authController.login)

export default authRouter;