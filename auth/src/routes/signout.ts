import express from 'express';
const router = express.Router();

router.post("/signout",(req,res)=>{
    res.send("Welcome to signout route");
});

export {router as signoutRouter};