import { Request, Response } from 'express';

import { DeliverymanRepository } from '@repositories/DeliverymanRepository';
import { FindDeliverymanDeliveriesUseCase } from './FindDeliverymanDeliveriesUseCase';

export class FindDeliverymanDeliveriesController {
  async handle(request: Request, response: Response) {
    const { deliveryman_id } = request;

    const deliverymanRepository = new DeliverymanRepository();
    const findDeliverymanDeliveriesUseCase =
      new FindDeliverymanDeliveriesUseCase(deliverymanRepository);
    const deliveries = await findDeliverymanDeliveriesUseCase.execute(
      deliveryman_id
    );

    return response.json(deliveries);
  }
}
