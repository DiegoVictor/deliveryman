import { prisma } from '../../../src/database/prisma';
import factory from '../../utils/factory';
import { FindNotDeliveredUseCase } from '../../../src/modules/deliveries/useCases/findNotDelivered/FindNotDeliveredUseCase';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';

describe('FindNotDeliveredUseCase', () => {
  it('should be able to find not delivered items', async () => {
    const client = await factory.attrs<IAccount>('Account');
    const { id: client_id } = await prisma.clients.create({
      data: client,
    });

    const deliveries = await factory.attrsMany<IDelivery>('Delivery', 5, {
      client_id,
    });
    await prisma.deliveries.createMany({
      data: deliveries,
    });

    const findNotDeliveredUseCase = new FindNotDeliveredUseCase();
    const response = await findNotDeliveredUseCase.execute();

    deliveries.forEach(delivery => {
      expect(response).toContainEqual({ id: expect.any(String), ...delivery });
    });
  });
});
