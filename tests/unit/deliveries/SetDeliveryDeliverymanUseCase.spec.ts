import factory from '../../utils/factory';
import { SetDeliveryDeliverymanUseCase } from '../../../src/modules/deliveries/useCases/setDeliveryDeliveryman/SetDeliveryDeliverymanUseCase';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { FakeDeliveryRepository } from '../../../src/modules/deliveries/repositories/FakeDeliveryRepository';

describe('SetDeliveryDeliverymanUseCase', () => {
  it("should be able to set delivery's deliveryman", async () => {
    const deliveryRepository = new FakeDeliveryRepository();
    const [{ id: client_id }, { id: deliveryman_id }] =
      await factory.attrsMany<IAccount>('Account', 2);

    const delivery = await factory.attrs<IDelivery>('Delivery', {
      client_id,
    });
    const { id } = await deliveryRepository.create(delivery);

    const setDeliveryDeliverymanUseCase = new SetDeliveryDeliverymanUseCase(
      deliveryRepository
    );
    const response = await setDeliveryDeliverymanUseCase.execute({
      id,
      deliveryman_id,
    });

    expect(response).toStrictEqual({
      ...delivery,
      id,
      deliveryman_id,
      client_id,
      created_at: expect.any(Date),
    });
  });
});
