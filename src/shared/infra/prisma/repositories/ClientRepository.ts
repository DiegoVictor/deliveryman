import { IClientRepository } from '../../../../modules/accounts/contracts/IClientRepository';
import { IAccount } from '../../../../modules/accounts/contracts/IAccount';
import { prisma } from '../client';

export class ClientRepository implements IClientRepository {
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

}
