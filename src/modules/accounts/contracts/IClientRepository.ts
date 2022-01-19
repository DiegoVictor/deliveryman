import { IAccount } from './IAccount';

export interface IClientRepository {
  findById(id: string): Promise<Pick<IAccount, 'id' | 'username'> | null>;
  findByUsername(username: string): Promise<IAccount | null>;
  create({ username, password }: IAccount): Promise<IAccount>;
}
