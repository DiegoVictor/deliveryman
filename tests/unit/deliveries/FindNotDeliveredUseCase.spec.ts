import { prisma } from '../../../src/shared/infra/prisma/client';
import factory from '../../utils/factory';
import { FindNotDeliveredUseCase } from '../../../src/modules/deliveries/useCases/findNotDelivered/FindNotDeliveredUseCase';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { FakeDeliveryRepository } from '../../../src/modules/deliveries/repositories/FakeDeliveryRepository';

describe('FindNotDeliveredUseCase', () => {
  it('should be able to find not delivered items', async () => {
    const deliveryRepository = new FakeDeliveryRepository();

    const { id: client_id } = await factory.attrs<IAccount>('Account');

    const deliveries = await factory.attrsMany<IDelivery>('Delivery', 5, {
      client_id,
    });
    await Promise.all(
      deliveries.map(delivery => deliveryRepository.create(delivery))
    );

    const findNotDeliveredUseCase = new FindNotDeliveredUseCase(
      deliveryRepository
    );
    const response = await findNotDeliveredUseCase.execute();

    deliveries.forEach(delivery => {
      expect(response).toContainEqual({ id: expect.any(String), ...delivery });
    });
  });
});
