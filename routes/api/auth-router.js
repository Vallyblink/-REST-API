import express from "express";

import { validateBody } from "../../decorators/index.js";

import userSchema from "../../schema/userSchema.js";

import authController from "../../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/singup", validateBody(userSchema.userSingUpSchema), authController.singup)

export default authRouter;