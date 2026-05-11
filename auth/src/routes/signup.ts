import express,{Request, Response} from 'express';
const router = express.Router();
import {body,validationResult} from 'express-validator';
router.post("/signup",[
    body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
    body("password").trim().isLength({min: 6,max:20}).withMessage("Password must be at least 6 characters long")
],(req: Request, res: Response)=>{
    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new Error("Invalid email or password");
    }
    console.log("creating user ");
    throw new Error("database connection failed");

    return res.status(200).json({msg: "User created successfully", email, password});

});

export {router as signupRouter};