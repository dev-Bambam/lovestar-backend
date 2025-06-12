import { TSchema } from "@sinclair/typebox";
import Ajv from "ajv";
import { Request, Response, NextFunction } from "express";
import { TypeBoxValidationError } from "../utils/error/Custom.err";

const ajv = new Ajv();

export function validateBody<T extends TSchema>(schema: T) {
   const validate = ajv.compile(schema);
   return (req: Request, res: Response, next: NextFunction) => {
      const valid = validate(req.body);
      if (!valid) {
         return next(new TypeBoxValidationError(validate.errors || []));
      }
      next();
   };
}
