import { badRequest, unauthorized } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const ensureClientAuthentication = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw badRequest('Missing authentication token', { code: 440 });
  }

  const [, token] = authorization.split(' ');

  try {
    const { sub } = verify(token, String(process.env.JWT_CLIENTS_SECRET));
    if (sub && typeof sub === 'string') {
      request.client_id = sub;
    }

    return next();
  } catch (err) {
    throw unauthorized('Invalid authentication token', 'sample', { code: 441 });
  }
};
