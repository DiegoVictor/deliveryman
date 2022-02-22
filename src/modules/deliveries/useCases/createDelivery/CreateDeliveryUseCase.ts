import { IDelivery } from '../../contracts/IDelivery';
import { IDeliveryRepository } from '../../contracts/IDeliveryRepository';

export class CreateDeliveryUseCase {
  private repository: IDeliveryRepository;

  constructor(repository: IDeliveryRepository) {
    this.repository = repository;
  }

  async execute({
    client_id,
    product_name,
  }: Pick<IDelivery, 'client_id' | 'product_name'>) {
    return this.repository.create({
      client_id,
      product_name,
    });
  }
}
