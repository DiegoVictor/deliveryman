import { prisma } from '../../../../database/prisma';

export class FindDeliverymanDeliveriesUseCase {
  async execute(deliveryman_id: string) {
    return prisma.deliveryman.findFirst({
      where: {
        id: deliveryman_id,
      },
      select: {
        deliveries: true,
        id: true,
        username: true,
      },
    });
  }
}
