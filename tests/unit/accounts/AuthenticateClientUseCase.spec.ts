import { hash } from 'bcrypt';
import { decode } from 'jsonwebtoken';

import factory from '../../utils/factory';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { AuthenticateClientUseCase } from '../../../src/modules/accounts/useCases/authenticateClient/AuthenticateClientUseCase';
import { prisma } from '../../../src/database/prisma';

describe('AuthenticateClientUseCase', () => {
  it('should be able to authenticate with client', async () => {
    const client = await factory.attrs<IAccount>('Account');

    const { id } = await prisma.clients.create({
      data: {
        username: client.username,
        password: await hash(client.password, 10),
      },
    });

    const authenticateClientUseCase = new AuthenticateClientUseCase();
    const token = await authenticateClientUseCase.execute(client);

    expect(token).toBeTruthy();

    const jwt = decode(token);
    expect(jwt).toStrictEqual({
      username: client.username,
      sub: id,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('should not be able to authenticate with non existing client', async () => {
    const client = await factory.attrs<IAccount>('Account');

    const authenticateClientUseCase = new AuthenticateClientUseCase();
    await expect(() =>
      authenticateClientUseCase.execute(client)
    ).rejects.toEqual(new Error('Username or password incorrect'));
  });

  it('should not be able to authenticate wrong password', async () => {
    const client = await factory.attrs<IAccount>('Account');

    await prisma.clients.create({
      data: {
        username: client.username,
        password: await hash(client.password, 10),
      },
    });

    const authenticateClientUseCase = new AuthenticateClientUseCase();
    await expect(() =>
      authenticateClientUseCase.execute({
        ...client,
        password: 'wrong-password',
      })
    ).rejects.toEqual(new Error('Username or password incorrect'));
  });
});
