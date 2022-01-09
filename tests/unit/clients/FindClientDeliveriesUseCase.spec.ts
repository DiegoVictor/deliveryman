import { prisma } from '../../../src/database/prisma';
import { FindClientDeliveriesUseCase } from '../../../src/modules/clients/useCases/findClientDeliveries/FindClientDeliveriesUseCase';
import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';

describe('FindClientDeliveriesUseCase', () => {
  it("should be able to find clients' deliveries", async () => {
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

    const findClientDeliveriesUseCase = new FindClientDeliveriesUseCase();
    const response = await findClientDeliveriesUseCase.execute(client_id);

    expect(response).toStrictEqual({
      id: client_id,
      username: client.username,
      deliveries: deliveries.map(delivery => ({
        id: expect.any(String),
        ...delivery,
      })),
    });
  });
});
