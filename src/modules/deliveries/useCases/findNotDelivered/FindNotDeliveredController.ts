import { Request, Response } from 'express';

import { DeliveryRepository } from '@modules/deliveries/infra/prisma/repositories/DeliveryRepository';
import { FindNotDeliveredUseCase } from './FindNotDeliveredUseCase';

export class FindNotDeliveredController {
  async handle(_: Request, response: Response) {
    const deliveryRepository = new DeliveryRepository();
    const findNotDeliveredUseCase = new FindNotDeliveredUseCase(
      deliveryRepository
    );
    const deliveries = await findNotDeliveredUseCase.execute();

    return response.json(deliveries);
  }
}
