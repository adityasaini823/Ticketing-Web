import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    //  console.log("here");
    if (existingUser) {
      console.log("User already exists with email: ", email);
      throw new BadRequestError("User already exists");
    }
    const user = User.build({ email, password });
    // generate JWT
    await user.save();
    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    // store jwt on session object
    req.session = { jwt: userJwt };
    return res.status(200).json({ msg: "User created successfully", user });
  },
);

export { router as signupRouter };
