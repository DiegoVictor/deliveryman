import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import factory from '../../utils/factory';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { AuthenticateDeliverymanController } from '../../../src/modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';

const execute = jest.fn(async (_: IAccount) => ({}));
jest.mock(
  '../../../src/modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanUseCase',
  () => {
    return {
      AuthenticateDeliverymanUseCase: function UseCase() {
        return {
          execute: async (deliveryman: IAccount) => execute(deliveryman),
        };
      },
    };
  }
);

describe('AuthenticateDeliverymanController', () => {
  it('should be able to authenticate deliveryman', async () => {
    const deliveryman = await factory.attrs<IAccount>('Account');
    const request = getMockReq({ body: deliveryman });
    const token = faker.random.alphaNumeric(32);

    const { res: response } = getMockRes();
    const authenticateDeliverymanController =
      new AuthenticateDeliverymanController();
    execute.mockReturnValue(Promise.resolve(token));

    await authenticateDeliverymanController.handle(request, response);

    expect(response.json).toHaveBeenCalledWith({ token });
  });
});
