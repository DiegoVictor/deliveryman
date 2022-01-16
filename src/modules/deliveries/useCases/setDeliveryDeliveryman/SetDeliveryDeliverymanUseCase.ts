import { prisma } from '../../../../shared/infra/prisma/client';
import { IDelivery } from '../../contracts/IDelivery';

export class SetDeliveryDeliverymanUseCase {
  async execute({
    id,
    deliveryman_id,
  }: Pick<IDelivery, 'id' | 'deliveryman_id'>) {
    return prisma.deliveries.update({
      where: {
        id,
      },
      data: {
        deliveryman_id,
      },
    });
  }
}
