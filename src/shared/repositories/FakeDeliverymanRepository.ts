import { randomUUID } from 'crypto';

import { IAccount } from '../../modules/accounts/contracts/IAccount';
import { IDeliverymanRepository } from '../../modules/accounts/contracts/IDeliverymanRepository';

export class FakeDeliverymanRepository implements IDeliverymanRepository {
  private repository: IAccount[] = [];

  async findById(
    id: string
  ): Promise<Pick<IAccount, 'id' | 'deliveries' | 'username'> | null> {
    const deliveryman = this.repository.find(
      deliveryman => deliveryman.id === id
    );

    if (deliveryman) {
      return deliveryman;
    }

    return null;
  }

  async findByUsername(username: string): Promise<IAccount | null> {
    const deliveryman = this.repository.find(
      deliveryman => deliveryman.username === username
    );

    if (deliveryman) {
      return deliveryman;
    }

    return null;
  }

  async create({ username, password }: IAccount): Promise<IAccount> {
    const deliveryman = {
      id: randomUUID(),
      username,
      password,
    };
    this.repository.push(deliveryman);

    return deliveryman;
  }
}
