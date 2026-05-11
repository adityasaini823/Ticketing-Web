import express from 'express';
const router = express.Router();

router.post("/signin",(req,res)=>{
    res.send("Welcome to signin route");
});

export {router as signinRouter};