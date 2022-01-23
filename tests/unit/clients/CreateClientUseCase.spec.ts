import { compare } from 'bcrypt';
import { badRequest } from '@hapi/boom';

import factory from '../../utils/factory';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { CreateClientUseCase } from '../../../src/modules/clients/useCases/createClient/CreateClientUseCase';
import { FakeClientRepository } from '../../../src/shared/repositories/FakeClientRepository';

describe('CreateClientUseCase', () => {
  it('should be able to create a new client', async () => {
    const client = await factory.attrs<IAccount>('Account');
    const fakeClientRepository = new FakeClientRepository();

    const createClientUseCase = new CreateClientUseCase(fakeClientRepository);
    const response = await createClientUseCase.execute(client);

    expect(response).toHaveProperty('id', expect.any(String));
    expect(response.username).toStrictEqual(client.username);
    expect(await compare(client.password, response.password));
  });

  it('should not be able to create a new client', async () => {
    const client = await factory.attrs<IAccount>('Account');
    const fakeClientRepository = new FakeClientRepository();

    const createClientUseCase = new CreateClientUseCase(fakeClientRepository);

    await createClientUseCase.execute(client);
    await expect(async () =>
      createClientUseCase.execute(client)
    ).rejects.toEqual(badRequest('Client already exists', { code: 240 }));
  });
});
