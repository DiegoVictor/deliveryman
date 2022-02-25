import { IAccount } from '../../../../modules/accounts/contracts/IAccount';
import { IDeliverymanRepository } from '../../../../modules/accounts/contracts/IDeliverymanRepository';
import { prisma } from '../client';

export class DeliverymanRepository implements IDeliverymanRepository {
  async findById(id: string) {
    return prisma.deliveryman.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        deliveries: true,
        username: true,
      },
    });
  }

  async findByUsername(username: string) {
    return prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });
  }

  async create({ username, password }: IAccount) {
    return prisma.deliveryman.create({
      data: {
        username,
        password,
      },
    });
  }
}
