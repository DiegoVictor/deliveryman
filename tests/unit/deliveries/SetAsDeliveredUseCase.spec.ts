import { SetAsDeliveredUseCase } from '../../../src/modules/deliveries/useCases/setAsDelivered/SetAsDeliveredUseCase';
import factory from '../../utils/factory';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../../src/modules/accounts/contracts/IAccount';
import { FakeDeliveryRepository } from '../../../src/modules/deliveries/repositories/FakeDeliveryRepository';

describe('SetAsDeliveredUseCase', () => {
  it('should be able to set delivery as delivered', async () => {
    const deliveryRepository = new FakeDeliveryRepository();

    const [{ id: client_id }, { id: deliveryman_id }] =
      await factory.attrsMany<IAccount>('Account', 2);

    const delivery = await factory.attrs<IDelivery>('Delivery', {
      client_id,
    });
    const { id } = await deliveryRepository.create(delivery);

    await deliveryRepository.updateById(id, {
      deliveryman_id,
    });

    const setAsDeliveredUseCase = new SetAsDeliveredUseCase(deliveryRepository);
    const response = await setAsDeliveredUseCase.execute({
      id,
      deliveryman_id,
    });

    expect(response).toStrictEqual({ count: 1 });
  });
});
