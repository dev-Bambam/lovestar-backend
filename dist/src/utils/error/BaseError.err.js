"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message, statusCode, status, type, isOperational = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = status;
        this.type = type;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = BaseError;
