import { prisma } from '../../../../database/prisma';

export class FindClientDeliveriesUseCase {
  async execute(client_id: string) {
    return prisma.clients.findFirst({
      where: {
        id: client_id,
      },
      select: {
        deliveries: true,
        id: true,
        username: true,
      },
    });
  }
}
