import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const ensureClientAuthentication = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(401).json({
      message: 'Missing authentication token',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const { sub } = verify(token, String(process.env.JWT_CLIENTS_SECRET));
    if (sub && typeof sub === 'string') {
      request.client_id = sub;
    }

    return next();
  } catch (err) {
    return response.status(401).json({
      message: 'Invalid authentication token',
    });
  }
};
