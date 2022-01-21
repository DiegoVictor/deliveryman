import { randomUUID } from 'crypto';

import { IAccount } from '../../modules/accounts/contracts/IAccount';
import { IClientRepository } from '../../modules/accounts/contracts/IClientRepository';

export class FakeClientRepository implements IClientRepository {
  private repository: IAccount[] = [];

  async findById(
    id: string
  ): Promise<Pick<IAccount, 'id' | 'username'> | null> {
    const client = this.repository.find(client => client.id === id);

    if (client) {
      return client;
    }

    return null;
  }

  async findByUsername(username: string): Promise<IAccount | null> {
    const client = this.repository.find(client => client.username === username);

    if (client) {
      return client;
    }

    return null;
  }

  async create({ username, password }: IAccount): Promise<IAccount> {
    const client = {
      id: randomUUID(),
      username,
      password,
    };
    this.repository.push(client);

    return client;
  }
}
