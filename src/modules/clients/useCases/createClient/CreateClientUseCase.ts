import { badRequest } from '@hapi/boom';
import { hash } from 'bcrypt';

import { prisma } from '../../../../database/prisma';
import { IAccount } from '../../../accounts/contracts/IAccount';
import { IClientRepository } from '../../../accounts/contracts/IClientRepository';

export class CreateClientUseCase {
  private repository: IClientRepository;

  constructor(repository: IClientRepository) {
    this.repository = repository;
  }

  async execute({ username, password }: IAccount) {
    const client = await this.repository.findByUsername(username);

    if (client) {
      throw badRequest('Client already exists', { code: 240 });
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
