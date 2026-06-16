import { Router ,Request, Response} from "express";
import { requireAuth } from "@adityasaini2468/ticketing-common";
import { BadRequestError } from "@adityasaini2468/ticketing-common";
import { validateRequest } from "@adityasaini2468/ticketing-common";
import { body } from "express-validator";
import { Ticket } from "../models/Ticket";
const router = Router();

router.post("/",
    [
        body("title").not().isEmpty().withMessage("Title is required"),
        body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
    ],
    validateRequest,
    requireAuth,
    async(req:Request,res:Response)=>{
    const {title,price} = req.body;
    const ticket = Ticket.build({
        title,
        price,
        userId:req.currentUser!.id
    });
    await ticket.save();
    res.status(200).json({});
})

export {router as newTicketRouter};