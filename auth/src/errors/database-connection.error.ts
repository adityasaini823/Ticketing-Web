import { ValidationError } from "express-validator";
import { error } from "node:console";
export class DatabaseConnectionError extends Error {
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