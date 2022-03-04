import { getMockReq, getMockRes } from '@jest-mock/express';
import { v4 as uuid } from 'uuid';

import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { FindClientDeliveriesController } from '../../../src/modules/clients/useCases/findClientDeliveries/FindClientDeliveriesController';

const execute = jest.fn(async (_: string) => ({}));
jest.mock(
  '../../../src/modules/clients/useCases/findClientDeliveries/FindClientDeliveriesUseCase',
  () => {
    return {
      FindClientDeliveriesUseCase: function UseCase() {
        return {
          execute: async (client_id: string) => execute(client_id),
        };
      },
    };
  }
);
jest.mock(
  '../../../src/shared/infra/prisma/repositories/ClientRepository',
  () => {
    return {
      ClientRepository: class Fake {},
    };
  }
);

describe('FindClientDeliveriesController', () => {
  it("should be able to find clients' deliveries", async () => {
    const client_id = uuid();
    const client = await factory.attrs<IAccount>('Account', { id: client_id });
    const deliveries = await factory.attrsMany<IDelivery>('Delivery', 5, {
      id: uuid,
      client_id,
    });
    const request = getMockReq({ client_id });

    const { res: response } = getMockRes();
    const findClientDeliveriesController = new FindClientDeliveriesController();
    execute.mockReturnValue(
      Promise.resolve({
        id: client_id,
        username: client.username,
        deliveries,
      })
    );

    await findClientDeliveriesController.handle(request, response);

    expect(response.json).toHaveBeenCalledWith({
      id: client_id,
      username: client.username,
      deliveries,
    });
  });
});
