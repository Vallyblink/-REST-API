import express from "express";

import { validateBody } from "../../decorators/index.js";

import userSchema from "../../schema/userSchema.js";

import authController from "../../controllers/authController.js";

import {authenticate} from "../../middlewars/index.js"

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema.userSingUpSchema), authController.register)

authRouter.post("/login", validateBody(userSchema.userSingInSchema), authController.login)

authRouter.get("/current", authenticate, authController.getCurrent)

authRouter.post("/logout",authenticate, authController.logout)

export default authRouter;