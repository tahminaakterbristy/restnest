
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod/v3";

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
    });

    next();
  };

export default validateRequest;