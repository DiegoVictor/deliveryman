import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';
import { randomUUID } from 'crypto';

import { CreateDeliveryController } from '../../../src/modules/deliveries/useCases/createDelivery/CreateDeliveryController';

interface IPayload {
  client_id: string;
  product_name: string;
}

const execute = jest.fn(async (_: IPayload) => ({}));
jest.mock(
  '../../../src/modules/deliveries/useCases/createDelivery/CreateDeliveryUseCase',
  () => {
    return {
      CreateDeliveryUseCase: function UseCase() {
        return {
          execute: async (data: IPayload) => execute(data),
        };
      },
    };
  }
);

describe('CreateDeliveryController', () => {
  it('should be able to create a new delivery', async () => {
    const client_id = faker.datatype.uuid();
    const product_name = faker.commerce.productName();
    const request = getMockReq({
      client_id,
      body: {
        product_name,
      },
    });

    const { res: response } = getMockRes();
    const createDeliveryController = new CreateDeliveryController();
    const id = randomUUID();
    const created_at = new Date();
    execute.mockReturnValue(
      Promise.resolve({
        id,
        client_id,
        deliveryman_id: null,
        product_name,
        delivered_at: null,
        created_at,
      })
    );

    await createDeliveryController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      id,
      client_id,
      deliveryman_id: null,
      product_name,
      delivered_at: null,
      created_at,
    });
  });
});
