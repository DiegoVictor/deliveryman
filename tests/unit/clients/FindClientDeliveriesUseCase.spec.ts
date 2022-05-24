import faker from '@faker-js/faker';

import { FindClientDeliveriesUseCase } from '../../../src/modules/clients/useCases/findClientDeliveries/FindClientDeliveriesUseCase';
import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { FakeClientRepository } from '../../../src/shared/repositories/FakeClientRepository';

describe('FindClientDeliveriesUseCase', () => {
  it("should be able to find clients' deliveries", async () => {
    const id = faker.datatype.uuid();
    const client = await factory.attrs<IAccount>('Account');
    const deliveries = await factory.attrsMany<IDelivery>('Delivery', 5, {
      id: faker.datatype.uuid,
      client_id: id,
    });

    const fakeClientRepository = new FakeClientRepository();
    const findClientDeliveriesUseCase = new FindClientDeliveriesUseCase(
      fakeClientRepository
    );

    jest.spyOn(fakeClientRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id,
        username: client.username,
        deliveries,
      })
    );
    const response = await findClientDeliveriesUseCase.execute(id);

    expect(response).toStrictEqual({
      id,
      username: client.username,
      deliveries: deliveries.map(delivery => ({
        id: expect.any(String),
        ...delivery,
      })),
    });
  });
});
