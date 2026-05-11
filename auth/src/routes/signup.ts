import express from 'express';
const router = express.Router();

router.post("/signup",(req,res)=>{
    res.send("Welcome to signup route");
});

export {router as signupRouter};