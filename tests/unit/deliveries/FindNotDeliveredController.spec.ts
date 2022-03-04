import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import factory from '../../utils/factory';
import { FindNotDeliveredController } from '../../../src/modules/deliveries/useCases/findNotDelivered/FindNotDeliveredController';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';

const execute = jest.fn(async () => ({}));
jest.mock(
  '../../../src/modules/deliveries/useCases/findNotDelivered/FindNotDeliveredUseCase',
  () => {
    return {
      FindNotDeliveredUseCase: function UseCase() {
        return {
          execute: async () => execute(),
        };
      },
    };
  }
);
jest.mock(
  '../../../src/modules/deliveries/infra/prisma/repositories/DeliveryRepository',
  () => {
    return {
      DeliveryRepository: class Fake {},
    };
  }
);

describe('FindNotDeliveredController', () => {
  it('should be able to find not delivered items', async () => {
    const request = getMockReq();

    const client_id = faker.datatype.uuid();
    const deliveries = await factory.attrsMany<IDelivery>('Delivery', 5, {
      client_id,
    });
    const { res: response } = getMockRes();
    const findNotDeliveredController = new FindNotDeliveredController();
    execute.mockReturnValue(Promise.resolve(deliveries));

    await findNotDeliveredController.handle(request, response);

    expect(response.json).toHaveBeenCalledWith(
      deliveries.map(delivery => delivery)
    );
  });
});
