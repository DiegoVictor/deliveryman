import { prisma } from '../../../src/database/prisma';
import { SetDeliveryDeliverymanUseCase } from '../../../src/modules/deliveries/useCases/setDeliveryDeliveryman/SetDeliveryDeliverymanUseCase';
import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';

describe('SetDeliveryDeliverymanUseCase', () => {
  it("should be able to set delivery's deliveryman", async () => {
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
    });
    const { id } = await prisma.deliveries.create({
      data: delivery,
    });

    const setDeliveryDeliverymanUseCase = new SetDeliveryDeliverymanUseCase();
    const response = await setDeliveryDeliverymanUseCase.execute({
      id,
      deliveryman_id,
    });

    expect(response).toStrictEqual({
      ...delivery,
      id,
      deliveryman_id,
      client_id,
    });
  });
});
