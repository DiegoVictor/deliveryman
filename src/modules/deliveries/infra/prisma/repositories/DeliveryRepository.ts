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

}
