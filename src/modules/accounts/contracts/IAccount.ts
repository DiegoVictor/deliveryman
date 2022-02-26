import { IDelivery } from '@modules/deliveries/contracts/IDelivery';

export interface IAccount {
  id?: string;
  username: string;
  password: string;
  deliveries?: IDelivery[];
}
