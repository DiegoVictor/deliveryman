import { badRequest } from '@hapi/boom';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { IAccount } from '../../contracts/IAccount';
import { IDeliverymanRepository } from '../../contracts/IDeliverymanRepository';

export class AuthenticateDeliverymanUseCase {
  private repository: IDeliverymanRepository;

  constructor(repository: IDeliverymanRepository) {
    this.repository = repository;
  }

  async execute({ username, password }: IAccount) {
    const deliveryman = await this.repository.findByUsername(username);

    if (deliveryman && (await compare(password, deliveryman.password))) {
      const token = sign(
        { username },
        String(process.env.JWT_DELIVERYMAN_SECRET),
        {
          subject: deliveryman.id,
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      return token;
    }

    throw badRequest('Username or password incorrect', { code: 140 });
  }
}
