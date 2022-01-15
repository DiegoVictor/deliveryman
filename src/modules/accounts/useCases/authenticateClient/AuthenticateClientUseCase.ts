import { badRequest } from '@hapi/boom';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../../database/prisma';
import { IAccount } from '../../contracts/IAccount';

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAccount) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (client && (await compare(password, client.password))) {
      const token = sign({ username }, String(process.env.JWT_CLIENTS_SECRET), {
        subject: client.id,
        expiresIn: process.env.JWT_EXPIRATION,
      });

      return token;
    }

    throw badRequest('Username or password incorrect', { code: 140 });
  }
}
