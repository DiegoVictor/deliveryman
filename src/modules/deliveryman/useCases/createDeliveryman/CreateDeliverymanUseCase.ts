import { badRequest } from '@hapi/boom';
import { hash } from 'bcrypt';

import { prisma } from '../../../../database/prisma';
import { IAccount } from '../../../accounts/contracts/IAccount';

export class CreateDeliverymanUseCase {
  async execute({ username, password }: IAccount) {
    const client = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });

    if (client) {
      throw badRequest('Deliveryman already exists', { code: 340 });
    }

    const paswordHash = await hash(password, 10);

    return prisma.deliveryman.create({
      data: {
        username,
        password: paswordHash,
      },
    });
  }
}
