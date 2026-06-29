import express from 'express';
const router = express.Router();
import { currentUser } from '@adityasaini2468/ticketing-common';
router.get("/currentuser", currentUser, async (req, res) => {
    return res.status(200).json({ currentUser: req.currentUser || null });
});

export {router as currentUserRouter};