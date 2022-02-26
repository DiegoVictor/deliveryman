import { IDeliveryRepository } from '@modules/deliveries/contracts/IDeliveryRepository';

export class FindNotDeliveredUseCase {
  private repository: IDeliveryRepository;

  constructor(repository: IDeliveryRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.findNotDeliverd();
  }
}
