import { IDelivery } from '@modules/deliveries/contracts/IDelivery';
import { IDeliveryRepository } from '@modules/deliveries/contracts/IDeliveryRepository';

export class SetAsDeliveredUseCase {
  private repository: IDeliveryRepository;

  constructor(repository: IDeliveryRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    return this.repository.updateById(id, {
      delivered_at: new Date(),
    });
  }
}
