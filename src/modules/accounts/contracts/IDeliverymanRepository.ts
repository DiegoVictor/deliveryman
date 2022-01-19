import { IAccount } from './IAccount';

export interface IDeliverymanRepository {
  findById(
    id: string
  ): Promise<Pick<IAccount, 'id' | 'deliveries' | 'username'> | null>;
  findByUsername(username: string): Promise<IAccount | null>;
  create({ username, password }: IAccount): Promise<IAccount>;
}
