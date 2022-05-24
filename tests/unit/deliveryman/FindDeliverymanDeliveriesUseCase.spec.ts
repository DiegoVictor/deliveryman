import faker from '@faker-js/faker';

import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { FindDeliverymanDeliveriesUseCase } from '../../../src/modules/deliveryman/useCases/findDeliverymanDeliveries/FindDeliverymanDeliveriesUseCase';
import { FakeDeliverymanRepository } from '../../../src/shared/repositories/FakeDeliverymanRepository';

describe('FindDeliverymanDeliveriesUseCase', () => {
  it("should be able to find deliveryman's deliveries", async () => {
    const id = faker.datatype.uuid();
    const deliveryman = await factory.attrs<IAccount>('Account');
    const deliveries = await factory.attrsMany<IDelivery>('Delivery', 5, {
      id: faker.datatype.uuid,
      client_id: faker.datatype.uuid,
      deliveryman_id: id,
    });

    const fakeDeliverymanRepository = new FakeDeliverymanRepository();
    jest.spyOn(fakeDeliverymanRepository, 'findById').mockReturnValue(
      Promise.resolve({
        id,
        username: deliveryman.username,
        deliveries,
      })
    );

    const findDeliverymanDeliveriesUseCase =
      new FindDeliverymanDeliveriesUseCase(fakeDeliverymanRepository);
    const response = await findDeliverymanDeliveriesUseCase.execute(id);

    expect(response).toStrictEqual({
      id,
      username: deliveryman.username,
      deliveries: deliveries.map(delivery => ({
        id: expect.any(String),
        ...delivery,
      })),
    });
  });
});
