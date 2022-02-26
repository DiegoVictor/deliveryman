import { badRequest } from '@hapi/boom';
import { hash } from 'bcrypt';

import { IAccount } from '@modules/accounts/contracts/IAccount';
import { IClientRepository } from '@modules/accounts/contracts/IClientRepository';

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

    return this.repository.create({
      username,
      password: paswordHash,
    });
  }
}
