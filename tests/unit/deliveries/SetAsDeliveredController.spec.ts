import { getMockReq, getMockRes } from '@jest-mock/express';
import { v4 as uuid } from 'uuid';

import { SetAsDeliveredController } from '../../../src/modules/deliveries/useCases/setAsDelivered/SetAsDeliveredController';

const execute = jest.fn(async () => ({}));
jest.mock(
  '../../../src/modules/deliveries/useCases/setAsDelivered/SetAsDeliveredUseCase',
  () => {
    return {
      SetAsDeliveredUseCase: function UseCase() {
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

describe('SetAsDeliveredController', () => {
  it('should be able to set delivery as delivered', async () => {
    const request = getMockReq({ deliveryman_id: uuid() });

    const { res: response } = getMockRes();
    const setAsDeliveredController = new SetAsDeliveredController();
    execute.mockReturnValue(Promise.resolve({ count: 1 }));

    await setAsDeliveredController.handle(request, response);

    expect(response.sendStatus).toHaveBeenCalledWith(204);
  });
});
