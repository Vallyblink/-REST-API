import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import fs from "fs/promises"
import path from "path";
import { nanoid } from 'nanoid';
import sgMail from "@sendgrid/mail"

import User from '../models/user.js';
import { HttpError, resizeAvatar, verificationEmail} from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

// const SENDGRID_API_KEY = process.env
// sgMail.setApiKey(SENDGRID_API_KEY)

const { JWT_SECRET} = process.env;

const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError (409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const avatarURL = await gravatar.url(email, {s: '200', r: 'pg', d: '404'});
    
    const verificationToken = nanoid()

    verificationEmail(email, verificationToken)

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
    res.status(201).json({
        "user": {
            email: newUser.email,
            subscription: newUser.subscription,
            avatar: newUser.avatarURL,
        }
      
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    };
    if (!user.verify) {
        throw HttpError(401, "Awaiting for verification");
    }
    
    const payload = {
        id: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        "user": {
            email: user.email,
            subscription: user.subscription
        }
    });
}

const getCurrent =(req, res) => {
    const { email, subscription } = req.user;
    if (!req.user) {
        throw HttpError(401)
    }
    res.json({
        email,
        subscription
        
    })
    
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token : "" });
    res.status(204).json("user");
}

const avatarUpdate = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    await resizeAvatar(oldPath);
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename)
    await User.findByIdAndUpdate(_id,{avatarURL})
    res.status(200).json({"avatarURL": avatarURL})
}

const getVerify = async (req, res) => {
    const { verificationToken } = req.params;
    const verificatedUser = await User.findOne({ verificationToken })
    if (!verificatedUser) {
        throw HttpError(404);
    }
    await User.findByIdAndUpdate(verificatedUser.id, { verify: true, verificationToken: " " });
    res.status(200).json({message : "Verification successful"})
}

const verify = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404);
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    verificationEmail(email, user.verificationToken)
    
    res.status(200).json({message:"Verification email sent"})
}

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    avatarUpdate: ctrlWrapper(avatarUpdate),
    getVerify: ctrlWrapper(getVerify),
    verify: ctrlWrapper(verify),
}