import Joi from "joi";

import { emailPattern } from "../constants/userConstans.js";

const userSingUpSchema = Joi.object({
    email: Joi.string().pattern(emailPattern).required(),
    password:Joi.string().min(6).required(),
})

const userSingInSchema = Joi.object({
    email: Joi.string().pattern(emailPattern).required(),
    password:Joi.string().min(6).required(),
})

const verificationSchema = Joi.object({
    email: Joi.string().pattern(emailPattern).required(),

})


export default {
    userSingInSchema,
    userSingUpSchema,
    verificationSchema
}