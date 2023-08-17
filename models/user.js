import { Schema, model } from "mongoose";

import { handleSaveError, validateAtUpdate } from './hooks.js'

import { emailPattern } from "../constants/userConstans.js";

const userSchema = new Schema({
    password: {
    minlength:6,
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailPattern,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
}, { versionKey: false, timestamps: true })

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;