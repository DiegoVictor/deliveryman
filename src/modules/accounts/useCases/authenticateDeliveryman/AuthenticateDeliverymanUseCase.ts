import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../../database/prisma';
import { IAccount } from '../../contracts/IAccount';

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAccount) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error('Username or password incorrect');
    }

    if (await compare(password, deliveryman.password)) {
      const token = sign(
        { username },
        String(process.env.JWT_DELIVERYMAN_SECRET),
        {
          subject: deliveryman.id,
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      return token;
    }

    throw badRequest('Username or password incorrect', { code: 140 });
  }
}
