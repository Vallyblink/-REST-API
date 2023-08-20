import express from "express";

import { validateBody } from "../../decorators/index.js";

import userSchema from "../../schema/userSchema.js";

import authController from "../../controllers/authController.js";

import {authenticate, upload} from "../../middlewars/index.js"

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchema.userSingUpSchema), authController.register)

authRouter.post("/login", validateBody(userSchema.userSingInSchema), authController.login)

authRouter.post("/logout", authenticate, authController.logout)

authRouter.get("/current", authenticate, authController.getCurrent)

authRouter.patch("/avatars", authenticate, upload.single("avatarURL"), authController.avatarUpdate)

export default authRouter;