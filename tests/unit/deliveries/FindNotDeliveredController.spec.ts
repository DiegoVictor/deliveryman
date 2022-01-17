import { getMockReq, getMockRes } from '@jest-mock/express';

import factory from '../../utils/factory';
import { prisma } from '../../../src/shared/infra/prisma/client';
import { FindNotDeliveredController } from '../../../src/modules/deliveries/useCases/findNotDelivered/FindNotDeliveredController';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';

const execute = jest.fn(async () => ({}));
jest.mock(
  '../../../src/modules/deliveries/useCases/findNotDelivered/findNotDeliveredUseCase',
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

describe('FindNotDeliveredController', () => {
  it('should be able to find not delivered items', async () => {
    const request = getMockReq();
    const client = await factory.attrs<IAccount>('Account');
    const { id: client_id } = await prisma.clients.create({
      data: client,
    });

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
