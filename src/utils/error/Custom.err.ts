import BaseError from "./BaseError.err";
import { ErrorObject } from "ajv";

export class TypeBoxValidationError extends BaseError {
   public errors: ErrorObject[];

   constructor(errors: ErrorObject[]) {
      super("Validation failed", 400, "error", "VALIDATION_ERR");
      this.errors = errors;
   }
}

export class UserAlreadyExistsError extends BaseError {
   constructor(email: string) {
      super(`User with email ${email} already exists`, 409, "error", "USER_EXISTS");
   }
}

export class ServerError extends BaseError {
   constructor(message = "Internal Server Error") {
      super(message, 500, "error", "SERVER_ERROR", false);
   }
}

export class DatabaseError extends BaseError {
   constructor(message = "Database Error") {
      super(message, 500, "error", "DATABASE_ERROR", false);
   }
}

export class NotFoundError extends BaseError {
   constructor(message = "Resource not found") {
      super(message, 404, "fail", "NOT_FOUND", true);
   }
}

export class BadRequestError extends BaseError{
    constructor(message = 'Bad Request') {
        super(message, 400, 'error', 'BAD_REQUEST_ERR')
    }
}