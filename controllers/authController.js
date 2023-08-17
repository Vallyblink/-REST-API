
import User from '../models/user.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const singup = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

export default {
    singup: ctrlWrapper(singup),
}