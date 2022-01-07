import { getMockReq, getMockRes } from '@jest-mock/express';
import faker from 'faker';

import factory from '../../utils/factory';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { AuthenticateClientController } from '../../../src/modules/accounts/useCases/authenticateClient/AuthenticateClientController';

const execute = jest.fn(async (_: IAccount) => ({}));
jest.mock(
  '../../../src/modules/accounts/useCases/authenticateClient/AuthenticateClientUseCase',
  () => {
    return {
      AuthenticateClientUseCase: function UseCase() {
        return {
          execute: async (client: IAccount) => execute(client),
        };
      },
    };
  }
);

describe('AuthenticateClientController', () => {
  it('should be able to authenticate client', async () => {
    const client = await factory.attrs<IAccount>('Account');
    const request = getMockReq({ body: client });
    const token = faker.random.alphaNumeric(32);

    const { res: response } = getMockRes();
    const authenticateClientController = new AuthenticateClientController();
    execute.mockReturnValue(Promise.resolve(token));

    await authenticateClientController.handle(request, response);

    expect(response.json).toHaveBeenCalledWith({ token });
  });
});
