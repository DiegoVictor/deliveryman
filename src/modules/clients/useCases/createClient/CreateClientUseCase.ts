import { hash } from 'bcrypt';

import { prisma } from '../../../../database/prisma';
import { IAccount } from '../../../accounts/contracts/IAccount';

export class CreateClientUseCase {
  async execute({ username, password }: IAccount) {
    const client = await prisma.clients.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });

    if (client) {
      throw new Error('Client already exists');
    }

    const paswordHash = await hash(password, 10);

    return prisma.clients.create({
      data: {
        username,
        password: paswordHash,
      },
    });
  }
}
