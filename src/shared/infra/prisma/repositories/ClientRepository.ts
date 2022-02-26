import { IClientRepository } from '@modules/accounts/contracts/IClientRepository';
import { IAccount } from '@modules/accounts/contracts/IAccount';
import { prisma } from '../client';

export class ClientRepository implements IClientRepository {
  async findById(id: string) {
    return prisma.clients.findFirst({
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
    return prisma.clients.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });
  }

  async create({ username, password }: IAccount) {
    return prisma.clients.create({
      data: {
        username,
        password,
      },
    });
  }
}
