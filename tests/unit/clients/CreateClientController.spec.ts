import { getMockReq, getMockRes } from '@jest-mock/express';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

import factory, { Person } from '../../utils/factory';
import { CreateClientController } from '../../../src/modules/clients/useCases/createClient/CreateClientController';

const execute = jest.fn(async (_: Person) => ({}));
jest.mock(
  '../../../src/modules/clients/useCases/createClient/CreateClientUseCase',
  () => {
    return {
      CreateClientUseCase: function UseCase() {
        return {
          execute: async (client: Person) => execute(client),
        };
      },
    };
  }
);

describe('CreateClientController', () => {
  it('should be able to create a new client', async () => {
    const client = await factory.attrs<Person>('Person');
    const request = getMockReq({ body: client });

    const { res: response } = getMockRes();
    const createClientController = new CreateClientController();

    const id = randomUUID();
    const passwordHash = await hash(client.password, 10);
    execute.mockReturnValue(
      Promise.resolve({
        ...client,
        id,
        password: passwordHash,
      })
    );

    await createClientController.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      id,
      username: client.username,
      password: passwordHash,
    });
  });
});
