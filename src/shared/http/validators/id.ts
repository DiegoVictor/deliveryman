import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

const schema = z.object({
  id: z.string(),
});

export const idValidator = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const data = request.params;
  try {
    request.body = schema.parse(data);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return response.status(400).json(err.errors);
    }

    next(err);
  }
};
