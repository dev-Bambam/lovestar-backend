import { TSchema } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from 'ajv-formats'
import { Request, Response, NextFunction } from "express";
import { TypeBoxValidationError } from "../utils/error/Custom.err";

const ajv = new Ajv();
addFormats(ajv)

export function validateBody<T extends TSchema>(schema: T) {
   const validate = ajv.compile(schema);
   return (req: Request, res: Response, next: NextFunction) => {
      const valid = validate(req.body);
      if (!valid) {
          next(new TypeBoxValidationError(validate.errors ?? []));
          return;
      }
      next();
   };
}
