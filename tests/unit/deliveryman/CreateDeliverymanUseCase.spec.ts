import { compare } from 'bcrypt';

import factory from '../../utils/factory';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { CreateDeliverymanUseCase } from '../../../src/modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase';

describe('CreateDeliverymanUseCase', () => {
  it('should be able to create a new deliveryman', async () => {
    const client = await factory.attrs<IAccount>('Account');

    const createDeliverymanUseCase = new CreateDeliverymanUseCase();
    const response = await createDeliverymanUseCase.execute(client);

    expect(response).toHaveProperty('id', expect.any(String));
    expect(response.username).toStrictEqual(client.username);
    expect(await compare(client.password, response.password));
  });

  it('should not be able to create a new deliveryman', async () => {
    const client = await factory.attrs<IAccount>('Account');

    const createDeliverymanUseCase = new CreateDeliverymanUseCase();

    await createDeliverymanUseCase.execute(client);
    await expect(async () =>
      createDeliverymanUseCase.execute(client)
    ).rejects.toEqual(new Error('Deliveryman already exists!'));
  });
});
