import { badRequest } from '@hapi/boom';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IAccount } from '../../contracts/IAccount';
import { IClientRepository } from '../../contracts/IClientRepository';

export class AuthenticateClientUseCase {
  private repository: IClientRepository;

  constructor(repository: IClientRepository) {
    this.repository = repository;
  }

  async execute({ username, password }: IAccount) {
    const client = await this.repository.findByUsername(username);

    if (client && (await compare(password, client.password))) {
      const token = sign({ username }, String(process.env.JWT_CLIENTS_SECRET), {
        subject: client.id,
        expiresIn: process.env.JWT_EXPIRATION,
      });

      return token;
    }

    throw badRequest('Username or password incorrect', { code: 140 });
  }
}
