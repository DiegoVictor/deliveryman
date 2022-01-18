import { prisma } from '../../../src/database/prisma';
import { SetAsDeliveredUseCase } from '../../../src/modules/deliveries/useCases/setAsDelivered/SetAsDeliveredUseCase';
import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';

describe('SetAsDeliveredUseCase', () => {
  it('should be able to set delivery as delivered', async () => {
    const [client, deliveryman] = await factory.attrsMany<IAccount>(
      'Account',
      2
    );
    const [{ id: client_id }, { id: deliveryman_id }] = await Promise.all([
      prisma.clients.create({
        data: client,
      }),
      prisma.deliveryman.create({
        data: deliveryman,
      }),
    ]);

    const delivery = await factory.attrs<IDelivery>('Delivery', {
      client_id,
      deliveryman_id,
    });
    const { id } = await prisma.deliveries.create({
      data: delivery,
    });

    const setAsDeliveredUseCase = new SetAsDeliveredUseCase();
    const response = await setAsDeliveredUseCase.execute({
      id,
      deliveryman_id,
    });

    expect(response).toStrictEqual({ count: 1 });
  });
});
