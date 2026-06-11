import { Request,Response,NextFunction } from "express";
import {NotAuthorizedError} from "../errors/not-authorized-error";
export const requireAuth = async(req: Request, res: Response, next: NextFunction) => {
    console.log("Current user in requireAuth middleware:", req.currentUser);
    if(!req.currentUser){
        throw new NotAuthorizedError();
    }
    next();
}