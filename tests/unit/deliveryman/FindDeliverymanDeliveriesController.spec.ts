import { getMockReq, getMockRes } from '@jest-mock/express';
import { v4 as uuid } from 'uuid';

import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { FindDeliverymanDeliveriesController } from '../../../src/modules/deliveryman/useCases/findDeliverymanDeliveries/FindDeliverymanDeliveriesController';

const execute = jest.fn(async (_: string) => ({}));
jest.mock(
  '../../../src/modules/deliveryman/useCases/findDeliverymanDeliveries/FindDeliverymanDeliveriesUseCase',
  () => {
    return {
      FindDeliverymanDeliveriesUseCase: function UseCase() {
        return {
          execute: async (deliveryman_id: string) => execute(deliveryman_id),
        };
      },
    };
  }
);
jest.mock(
  '../../../src/shared/infra/prisma/repositories/DeliverymanRepository',
  () => {
    return {
      DeliverymanRepository: class Fake {},
    };
  }
);

describe('FindDeliverymanDeliveriesController', () => {
  it("should be able to find deliveryman's deliveries", async () => {
    const deliveryman_id = uuid();
    const deliveryman = await factory.attrs<IAccount>('Account', {
      id: deliveryman_id,
    });
    const deliveries = await factory.attrsMany<IDelivery>('Delivery', 5, {
      id: uuid,
      deliveryman_id,
    });
    const request = getMockReq({ deliveryman_id });

    const { res: response } = getMockRes();
    const findDeliverymanDeliveriesController =
      new FindDeliverymanDeliveriesController();
    execute.mockReturnValue(
      Promise.resolve({
        id: deliveryman_id,
        username: deliveryman.username,
        deliveries,
      })
    );

    await findDeliverymanDeliveriesController.handle(request, response);

    expect(response.json).toHaveBeenCalledWith({
      id: deliveryman_id,
      username: deliveryman.username,
      deliveries,
    });
  });
});
