import { Router ,Request, Response} from "express";
import { requireAuth } from "@adityasaini2468/ticketing-common";
import { BadRequestError } from "@adityasaini2468/ticketing-common";
import { validateRequest } from "@adityasaini2468/ticketing-common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
const router = Router();

router.put("/:id",
    [
        body("title").not().isEmpty().withMessage("Title is required"),
        body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
    ],
    validateRequest,
    requireAuth,
    async(req:Request,res:Response)=>{
    const {title,price} = req.body;
    const id = req.params.id;
    if(!id){
        throw new BadRequestError("Ticket id is required");
    }
    const ticket = await Ticket.findById(id);
    if(!ticket){
        throw new BadRequestError("Ticket not found");
    }
    const newticket = await Ticket.findByIdAndUpdate(id, {
        title,
        price,
        userId:req.currentUser!.id
    }, { new: true });
    res.status(200).json({msg: "Ticket updated successfully", ticket: newticket});
})

export {router as updateTicketRouter};