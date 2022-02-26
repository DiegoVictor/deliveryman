import { IDeliverymanRepository } from '@modules/accounts/contracts/IDeliverymanRepository';

export class FindDeliverymanDeliveriesUseCase {
  private repository: IDeliverymanRepository;

  constructor(repository: IDeliverymanRepository) {
    this.repository = repository;
  }

  async execute(deliveryman_id: string) {
    return this.repository.findById(deliveryman_id);
  }
}
