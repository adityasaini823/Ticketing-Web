import { Router } from "express";
import { requireAuth } from "@adityasaini2468/ticketing-common";
import { BadRequestError } from "@adityasaini2468/ticketing-common";
const router = Router();

router.post("/",requireAuth,async(req,res)=>{
    const {title,price} = req.body;
    if(!title){
        throw new BadRequestError("Invalid title");
    }
    if(price === undefined || price < 0){
        throw new BadRequestError("Invalid price");
    }
    res.status(200).json({});
})

export {router as newTicketRouter};