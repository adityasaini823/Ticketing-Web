import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    statusCode = 400;
    constructor(public errors?: ValidationError[]) {
        super();
        
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors(){
        return this.errors?.map(err => {
            console.log("Serializing error: ", err);
            return {message: err.msg, field:err.type };
        });
    }
}
// throw new RequestValidationError(errors);