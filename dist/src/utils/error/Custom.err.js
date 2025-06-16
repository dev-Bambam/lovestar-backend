"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.BadRequestError = exports.NotFoundError = exports.DatabaseError = exports.ServerError = exports.UserAlreadyExistsError = exports.TypeBoxValidationError = void 0;
const BaseError_err_1 = __importDefault(require("./BaseError.err"));
class TypeBoxValidationError extends BaseError_err_1.default {
    constructor(errors) {
        super("Validation failed", 400, "error", "VALIDATION_ERR");
        this.errors = errors;
    }
}
exports.TypeBoxValidationError = TypeBoxValidationError;
class UserAlreadyExistsError extends BaseError_err_1.default {
    constructor(email) {
        super(`User with email ${email} already exists`, 409, "error", "USER_EXISTS");
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class ServerError extends BaseError_err_1.default {
    constructor(message = "Internal Server Error") {
        super(message, 500, "error", "SERVER_ERROR", false);
    }
}
exports.ServerError = ServerError;
class DatabaseError extends BaseError_err_1.default {
    constructor(message = "Database Error") {
        super(message, 500, "error", "DATABASE_ERROR", false);
    }
}
exports.DatabaseError = DatabaseError;
class NotFoundError extends BaseError_err_1.default {
    constructor(message = "Resource not found") {
        super(message, 404, "fail", "NOT_FOUND", true);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends BaseError_err_1.default {
    constructor(message = 'Bad Request') {
        super(message, 400, 'error', 'BAD_REQUEST_ERR');
    }
}
exports.BadRequestError = BadRequestError;
class ForbiddenError extends BaseError_err_1.default {
    constructor(message = "Forbidden: Access Denied") {
        super(message, 403, "fail", "FORBIDDEN", true);
    }
}
exports.ForbiddenError = ForbiddenError;
