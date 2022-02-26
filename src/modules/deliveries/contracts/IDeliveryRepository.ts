import { IDelivery } from './IDelivery';

export interface IDeliveryRepository {
  updateById(id: string, data: Partial<IDelivery>): Promise<IDelivery>;
  findNotDeliverd(): Promise<IDelivery[]>;
  create({
    client_id,
    product_name,
  }: Pick<IDelivery, 'client_id' | 'product_name'>): Promise<IDelivery>;
}
