import faker from 'faker';
import { hash } from 'bcrypt';

import factory from '../../utils/factory';
import { CreateDeliveryUseCase } from '../../../src/modules/deliveries/useCases/createDelivery/CreateDeliveryUseCase';
import { prisma } from '../../../src/shared/infra/prisma/client';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';

describe('CreateDeliveryUseCase', () => {
  it('should be able to create a new delivery', async () => {
    const client = await factory.attrs<IAccount>('Account');

    const { id: client_id } = await prisma.clients.create({
      data: {
        username: client.username,
        password: await hash(client.password, 10),
      },
    });

    const product_name = faker.commerce.productName();
    const createDeliveryUseCase = new CreateDeliveryUseCase();
    const delivery = await createDeliveryUseCase.execute({
      product_name,
      client_id,
    });

    expect(delivery).toStrictEqual({
      id: expect.any(String),
      client_id,
      deliveryman_id: null,
      product_name,
      delivered_at: null,
      created_at: expect.any(Date),
    });
  });
});
