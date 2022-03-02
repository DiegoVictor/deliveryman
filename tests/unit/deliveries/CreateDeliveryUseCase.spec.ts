import factory from '../../utils/factory';
import { CreateDeliveryUseCase } from '../../../src/modules/deliveries/useCases/createDelivery/CreateDeliveryUseCase';
import { FakeDeliveryRepository } from '../../../src/modules/deliveries/repositories/FakeDeliveryRepository';
import { IDelivery } from '../../../src/modules/deliveries/contracts/IDelivery';

describe('CreateDeliveryUseCase', () => {
  it('should be able to create a new delivery', async () => {
    const deliveryRepository = new FakeDeliveryRepository();

    const { client_id, product_name } = await factory.attrs<IDelivery>(
      'Delivery'
    );
    await deliveryRepository.create({ client_id, product_name });

    const createDeliveryUseCase = new CreateDeliveryUseCase(deliveryRepository);
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
