import express,{Request, Response} from 'express';
import {body,validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/User';
const router = express.Router();

router.post("/signup",[
    body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
    body("password").trim().isLength({min: 6,max:20}).withMessage("Password must be at least 6 characters long")
],async(req: Request, res: Response)=>{
    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
     const existingUser = await User.findOne({email});
     if(existingUser){
        console.log("User already exists with email: ", email);
        throw new BadRequestError("User already exists");
     }
     const user = User.build({email,password});
     await user.save;
    return res.status(200).json({msg: "User created successfully",user});

});

export {router as signupRouter};