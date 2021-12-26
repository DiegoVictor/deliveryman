import { hash } from 'bcrypt';

import { prisma } from '../../../../database/prisma';

interface IDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: IDeliveryman) {
    const client = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });

    if (client) {
      throw new Error('Deliveryman already exists!');
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
