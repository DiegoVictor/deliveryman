import { IDelivery } from '@modules/deliveries/contracts/IDelivery';
import { IDeliveryRepository } from '@modules/deliveries/contracts/IDeliveryRepository';

export class SetDeliveryDeliverymanUseCase {
  private repository: IDeliveryRepository;

  constructor(repository: IDeliveryRepository) {
    this.repository = repository;
  }

  async execute({
    id,
    deliveryman_id,
  }: Required<Pick<IDelivery, 'id' | 'deliveryman_id'>>) {
    return this.repository.updateById(id, {
      deliveryman_id,
    });
  }
}
