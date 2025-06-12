import BaseError from "./BaseError.err";
import { ErrorObject } from "ajv";

export class TypeBoxValidationError extends BaseError{
    public errors: ErrorObject[];

    constructor(errors:ErrorObject[]) {
        super(
            'Validation failed',
            400,
            'error',
            "VALIDATION_ERR"
        )
        this.errors = errors
    }
}

