import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err:Error, 
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    console.error("something went wrong",err);
    res.status(400).send({
        msg: err.message || "Something went wrong"
    });
}