import { getMockReq, getMockRes } from '@jest-mock/express';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

import factory from '../../utils/factory';
import { CreateDeliverymanController } from '../../../src/modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';

const execute = jest.fn(async (_: IAccount) => ({}));
jest.mock(
  '../../../src/modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase',
  () => {
    return {
      CreateDeliverymanUseCase: function UseCase() {
        return {
          execute: async (client: IAccount) => execute(client),
        };
      },
    };
  }
);

describe('CreateDeliverymanController', () => {
  it('should be able to create a new client', async () => {
    const client = await factory.attrs<IAccount>('Account');
    const request = getMockReq({ body: client });

    const { res: response } = getMockRes();
    const createDeliverymanController = new CreateDeliverymanController();

    const id = randomUUID();
    const passwordHash = await hash(client.password, 10);
    execute.mockReturnValue(
      Promise.resolve({
        ...client,
        id,
        password: passwordHash,
      })
    );

    await createDeliverymanController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      id,
      username: client.username,
      password: passwordHash,
    });
  });
});
