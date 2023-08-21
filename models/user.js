import { Schema, model } from "mongoose";

import { handleSaveError, validateAtUpdate } from './hooks.js'

import { emailPattern } from "../constants/userConstans.js";

const userSchema = new Schema({
  token: String,
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
  avatarURL:{
    type: String,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },

  
}, { versionKey: false, timestamps: true })

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;