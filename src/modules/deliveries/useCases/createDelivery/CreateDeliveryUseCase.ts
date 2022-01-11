import { prisma } from '../../../../database/prisma';
import { IDelivery } from '../../contracts/IDelivery';

export class CreateDeliveryUseCase {
  async execute({
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
