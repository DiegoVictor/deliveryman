import { prisma } from '../../../src/database/prisma';
import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { FindDeliverymanDeliveriesUseCase } from '../../../src/modules/deliveryman/useCases/findDeliverymanDeliveries/FindDeliverymanDeliveriesUseCase';

describe('FindDeliverymanDeliveriesUseCase', () => {
  it("should be able to find deliveryman's deliveries", async () => {
    const [client, deliveryman] = await factory.attrsMany<IAccount>(
      'Account',
      2
    );
    const [{ id: client_id }, { id: deliveryman_id }] = await Promise.all([
      prisma.clients.create({
        data: client,
      }),
      prisma.deliveryman.create({
        data: deliveryman,
      }),
    ]);

    const deliveries = await factory.attrsMany<IDelivery>('Delivery', 5, {
      client_id,
      deliveryman_id,
    });
    await prisma.deliveries.createMany({
      data: deliveries,
    });

    const findDeliverymanDeliveriesUseCase =
      new FindDeliverymanDeliveriesUseCase();
    const response = await findDeliverymanDeliveriesUseCase.execute(
      deliveryman_id
    );

    expect(response).toStrictEqual({
      id: deliveryman_id,
      username: deliveryman.username,
      deliveries: deliveries.map(delivery => ({
        id: expect.any(String),
        ...delivery,
      })),
    });
  });
});
