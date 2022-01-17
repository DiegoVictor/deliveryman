import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

const schema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

type Params = z.infer<typeof schema>;

export const usernameAndPasswordValidator = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const data: Params = request.body;
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
