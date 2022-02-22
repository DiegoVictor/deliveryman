import { prisma } from '../../../../../shared/infra/prisma/client';
import { IDelivery } from '../../../contracts/IDelivery';
import { IDeliveryRepository } from '../../../contracts/IDeliveryRepository';

export class DeliveryRepository implements IDeliveryRepository {
  async updateById(id: string, data: Partial<IDelivery>) {
    return prisma.deliveries.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateMany(where: Partial<IDelivery>, data: Partial<IDelivery>) {
    return prisma.deliveries.updateMany({
      where,
      data,
    });
  }

  async findNotDeliverd() {
    return prisma.deliveries.findMany({
      where: {
        delivered_at: null,
        deliveryman_id: null,
      },
    });
  }

  async create({
    client_id,
    product_name,
  }: Pick<IDelivery, 'client_id' | 'product_name'>) {
    return prisma.deliveries.create({
      data: {
        client_id,
        product_name,
      },
    });
  }
}
