import { compare } from 'bcrypt';

import factory from '../../utils/factory';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { CreateClientUseCase } from '../../../src/modules/clients/useCases/createClient/CreateClientUseCase';

describe('CreateClientUseCase', () => {
  it('should be able to create a new client', async () => {
    const client = await factory.attrs<IAccount>('Account');

    const createClientUseCase = new CreateClientUseCase();
    const response = await createClientUseCase.execute(client);

    expect(response).toHaveProperty('id', expect.any(String));
    expect(response.username).toStrictEqual(client.username);
    expect(await compare(client.password, response.password));
  });

  it('should not be able to create a new client', async () => {
    const client = await factory.attrs<IAccount>('Account');

    const createClientUseCase = new CreateClientUseCase();

    await createClientUseCase.execute(client);
    await expect(async () =>
      createClientUseCase.execute(client)
    ).rejects.toEqual(new Error('Client already exists'));
  });
});
