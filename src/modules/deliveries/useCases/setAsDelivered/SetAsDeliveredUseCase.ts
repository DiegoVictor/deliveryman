import { prisma } from '../../../../shared/infra/prisma/client';
import { IDelivery } from '../../contracts/IDelivery';

export class SetAsDeliveredUseCase {
  async execute({
    id,
    deliveryman_id,
  }: Pick<IDelivery, 'id' | 'deliveryman_id'>) {
    return prisma.deliveries.updateMany({
      where: {
        id,
        deliveryman_id,
      },
      data: {
        delivered_at: new Date(),
      },
    });
  }
}
