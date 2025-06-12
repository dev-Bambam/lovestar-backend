import BaseError from "../utils/error/BaseError.err";
import { TypeBoxValidationError } from "../utils/error/Custom.err";
import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (err: BaseError, req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode ?? 500
    const type = err.type ?? "SERVER_ERR"
    const status = err.status ?? 'fail'
    const message = err.message ?? 'Server down, will be up soon'
    let errorDetail = {}

    if (err instanceof TypeBoxValidationError) {
        errorDetail = {error: err.errors}
    }

    res.status(statusCode).json({
        status,
        type,
        message,
        ...errorDetail
    })
}

export default globalErrorHandler