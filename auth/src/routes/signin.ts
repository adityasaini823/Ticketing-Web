import express from 'express';
const router = express.Router();
import { validateRequest } from "../middlewares/validate-request";
import { User } from '../models/User';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
router.post("/signin", validateRequest, async (req, res) => {
    const { email, password } = req.body;
    // find excisting user
    const excistingUser = User.findOne({ email });
    if(!excistingUser){
        throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch =await Password.compare(excistingUser.password, password);
     if(!passwordMatch){
        throw new BadRequestError("Invalid credentials");
     }
    const userJwt = jwt.sign(
        {
        id: excistingUser._id,
        email: excistingUser.email,
        },
        process.env.JWT_KEY!,
    );

    req.session = { jwt: userJwt };
    return res.status(200).json({ msg: "User signed in successfully", user: excistingUser });
    
});

export {router as signinRouter};