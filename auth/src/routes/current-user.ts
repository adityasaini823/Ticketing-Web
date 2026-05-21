import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { currentUser } from '../middlewares/current-user';
import {requireAuth} from '../middlewares/require-auth';
router.get("/currentuser",currentUser,requireAuth,async (req,res)=>{
    return res.status(200).json({ currentUser: req.currentUser || null });
});

export {router as currentUserRouter};