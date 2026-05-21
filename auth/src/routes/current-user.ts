import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
router.get("/currentuser",currentUser,async (req,res)=>{
    return res.status(200).json({ currentUser: req.currentUser || null });
});

export {router as currentUserRouter};