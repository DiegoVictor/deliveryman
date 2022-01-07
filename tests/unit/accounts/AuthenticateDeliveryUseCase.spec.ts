import { hash } from 'bcrypt';
import { decode } from 'jsonwebtoken';

import factory from '../../utils/factory';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { prisma } from '../../../src/database/prisma';
import { AuthenticateDeliverymanUseCase } from '../../../src/modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanUseCase';

describe('AuthenticateDeliveryUseCase', () => {
  it('should be able to authenticate with deliveryman', async () => {
    const deliveryman = await factory.attrs<IAccount>('Account');

    const { id } = await prisma.deliveryman.create({
      data: {
        username: deliveryman.username,
        password: await hash(deliveryman.password, 10),
      },
    });

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();
    const token = await authenticateDeliverymanUseCase.execute(deliveryman);

    expect(token).toBeTruthy();

    const jwt = decode(token);
    expect(jwt).toStrictEqual({
      username: deliveryman.username,
      sub: id,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('should not be able to authenticate with non existing deliveryman', async () => {
    const deliveryman = await factory.attrs<IAccount>('Account');

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();
    await expect(() =>
      authenticateDeliverymanUseCase.execute(deliveryman)
    ).rejects.toEqual(new Error('Username or password incorrect'));
  });

  it('should not be able to authenticate wrong password', async () => {
    const deliveryman = await factory.attrs<IAccount>('Account');

    await prisma.deliveryman.create({
      data: {
        username: deliveryman.username,
        password: await hash(deliveryman.password, 10),
      },
    });

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();
    await expect(() =>
      authenticateDeliverymanUseCase.execute({
        ...deliveryman,
        password: 'wrong-password',
      })
    ).rejects.toEqual(new Error('Username or password incorrect'));
  });
});
