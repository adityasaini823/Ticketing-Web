import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload{
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
export const currentUser = async(req: Request, res: Response, next: NextFunction) => {
    if(!req.session?.jwt){
        return res.status(200).json({ currentUser: null });
    }
        try{
            const userJwt = req.session.jwt;
            const payload = await jwt.verify(userJwt, process.env.JWT_KEY!);
            req.currentUser = payload as UserPayload;
        }catch(err){
            return res.status(200).json({ currentUser: null });
        }
    next();
}