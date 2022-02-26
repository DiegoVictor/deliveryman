import { randomUUID } from 'crypto';

import { IDelivery } from '@modules/deliveries/contracts/IDelivery';
import { IDeliveryRepository } from '@modules/deliveries/contracts/IDeliveryRepository';

export class FakeDeliveryRepository implements IDeliveryRepository {
  private repository: IDelivery[] = [];

  async updateById(id: string, data: Partial<IDelivery>): Promise<IDelivery> {
    const deliveryIndex = this.repository.findIndex(
      delivery => delivery.id === id
    );

    const delivery = {
      ...this.repository[deliveryIndex],
      ...data,
    };
    this.repository[deliveryIndex] = delivery;

    return delivery;
  }

  async findNotDeliverd(): Promise<IDelivery[]> {
    return this.repository.filter(
      ({ delivered_at, deliveryman_id }) => !delivered_at && !deliveryman_id
    );
  }

  async create({
    client_id,
    product_name,
  }: Required<
    Pick<IDelivery, 'client_id' | 'product_name'>
  >): Promise<IDelivery> {
    const delivery = {
      id: randomUUID(),
      client_id,
      product_name,
      delivered_at: null,
      deliveryman_id: null,
      created_at: new Date(),
    };
    this.repository.push(delivery);

    return delivery;
  }
}
