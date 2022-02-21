import { IDelivery } from '../../contracts/IDelivery';
import { IDeliveryRepository } from '../../contracts/IDeliveryRepository';

export class SetAsDeliveredUseCase {
  private repository: IDeliveryRepository;

  constructor(repository: IDeliveryRepository) {
    this.repository = repository;
  }

  async execute({
    id,
    deliveryman_id,
  }: Pick<IDelivery, 'id' | 'deliveryman_id'>) {
    return this.repository.updateMany(
      {
        id,
        deliveryman_id,
      },
      {
        delivered_at: new Date(),
      }
    );
  }
}
