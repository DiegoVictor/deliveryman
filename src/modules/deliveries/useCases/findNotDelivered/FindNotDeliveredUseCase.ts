import { prisma } from '../../../../database/prisma';

export class FindNotDeliveredUseCase {
  async execute() {
    return prisma.deliveries.findMany({
      where: {
        delivered_at: null,
        deliveryman_id: null,
      },
    });
  }
}
