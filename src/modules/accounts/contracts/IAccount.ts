import { IDelivery } from '../../deliveries/contracts/IDelivery';

export interface IAccount {
  id?: string;
  username: string;
  password: string;
  deliveries?: IDelivery[];
}
