"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Custom_err_1 = require("../utils/error/Custom.err");
const util_1 = __importDefault(require("util"));
const globalErrorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode ?? 500;
    const type = err.type ?? "SERVER_ERR";
    const status = err.status ?? 'fail';
    const message = err.message ?? 'Server down, will be up soon';
    let errorDetail = {};
    if (err instanceof Custom_err_1.TypeBoxValidationError) {
        errorDetail = { error: err.errors };
    }
    if (!err.isOperational) {
        console.error("Server Error:", util_1.default.inspect(err, { depth: null, colors: true }));
    }
    res.status(statusCode).json({
        status,
        type,
        message,
        ...errorDetail
    });
};
exports.default = globalErrorHandler;
