import { Prisma } from '.prisma/client';

import { IDelivery } from './IDelivery';

export interface IDeliveryRepository {
  updateById(id: string, data: Partial<IDelivery>): Promise<IDelivery>;
  updateMany(
    where: Partial<IDelivery>,
    data: Partial<IDelivery>
  ): Promise<Prisma.BatchPayload>;
  findNotDeliverd(): Promise<IDelivery[]>;
  create({
    client_id,
    product_name,
  }: Pick<IDelivery, 'client_id' | 'product_name'>): Promise<IDelivery>;
}
