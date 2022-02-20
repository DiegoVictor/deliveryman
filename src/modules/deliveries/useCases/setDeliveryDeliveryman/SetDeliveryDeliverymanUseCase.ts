import { IDelivery } from '../../contracts/IDelivery';
import { IDeliveryRepository } from '../../contracts/IDeliveryRepository';

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
