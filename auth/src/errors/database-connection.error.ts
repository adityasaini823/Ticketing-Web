import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class DatabaseConnectionError extends CustomError {
    reason = "Error connecting to database";
    statusCode = 500;
    constructor(public errors?: ValidationError[]) {
        super();
        
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors(){
        return [
            {message: this.reason}
        ]
    }
}
// throw new DatabaseConnectionError(errors);