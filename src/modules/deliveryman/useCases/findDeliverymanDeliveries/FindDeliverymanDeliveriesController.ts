import { Request, Response } from 'express';

import { FindDeliverymanDeliveriesUseCase } from './FindDeliverymanDeliveriesUseCase';

export class FindDeliverymanDeliveriesController {
  async handle(request: Request, response: Response) {
    const { deliveryman_id } = request;

    const findDeliverymanDeliveriesUseCase =
      new FindDeliverymanDeliveriesUseCase();
    const deliveries = await findDeliverymanDeliveriesUseCase.execute(
      deliveryman_id
    );

    return response.json(deliveries);
  }
}
