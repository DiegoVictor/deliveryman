import { badRequest } from '@hapi/boom';
import { hash } from 'bcrypt';

import { IAccount } from '@modules/accounts/contracts/IAccount';
import { IDeliverymanRepository } from '@modules/accounts/contracts/IDeliverymanRepository';

export class CreateDeliverymanUseCase {
  private repository: IDeliverymanRepository;

  constructor(repository: IDeliverymanRepository) {
    this.repository = repository;
  }

  async execute({ username, password }: IAccount) {
    const client = await this.repository.findByUsername(username);

    if (client) {
      throw badRequest('Deliveryman already exists', { code: 340 });
    }

    const paswordHash = await hash(password, 10);

    return this.repository.create({
      username,
      password: paswordHash,
    });
  }
}
