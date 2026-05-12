import express,{Request, Response} from 'express';
import {body,validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection.error';

const router = express.Router();

router.post("/signup",[
    body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
    body("password").trim().isLength({min: 6,max:20}).withMessage("Password must be at least 6 characters long")
],(req: Request, res: Response)=>{
    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    console.log("creating user ");
    throw new DatabaseConnectionError();

    return res.status(200).json({msg: "User created successfully", email, password});

});

export {router as signupRouter};