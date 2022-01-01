import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../../database/prisma';
import { IAccount } from '../../models/IAccount';

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAccount) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error('Username or password incorrect');
    }

    if (await compare(password, client.password)) {
      const token = sign({ username }, String(process.env.JWT_CLIENT_SECRET), {
        subject: client.id,
        expiresIn: process.env.JWT_EXPIRATION,
      });

      return token;
    }

    throw new Error('Username or password incorrect');
  }
}
