import { getMockReq, getMockRes } from '@jest-mock/express';
import { randomUUID } from 'crypto';

import { SetDeliveryDeliverymanController } from '../../../src/modules/deliveries/useCases/setDeliveryDeliveryman/SetDeliveryDeliverymanController';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';

const execute = jest.fn(async (_: IDelivery) => ({}));
jest.mock(
  '../../../src/modules/deliveries/useCases/setDeliveryDeliveryman/SetDeliveryDeliverymanUseCase',
  () => {
    return {
      SetDeliveryDeliverymanUseCase: function UseCase() {
        return {
          execute: async (delivery: IDelivery) => execute(delivery),
        };
      },
    };
  }
);

describe('SetDeliveryDeliverymanController', () => {
  it("should be able to set delivery's deliveryman", async () => {
    const id = randomUUID();
    const deliveryman_id = randomUUID();
    const request = getMockReq({
      deliveryman_id,
      params: {
        id,
      },
    });

    const { res: response } = getMockRes();
    const setDeliveryDeliverymanController =
      new SetDeliveryDeliverymanController();
    execute.mockReturnValue(
      Promise.resolve({
        id,
        deliveryman_id,
      })
    );

    await setDeliveryDeliverymanController.handle(request, response);

    expect(response.sendStatus).toHaveBeenCalledWith(204);
  });
});
