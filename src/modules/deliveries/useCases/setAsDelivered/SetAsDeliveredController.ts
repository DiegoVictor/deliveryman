import { Request, Response } from 'express';

import { DeliveryRepository } from '../../infra/prisma/repositories/DeliveryRepository';
import { SetAsDeliveredUseCase } from './SetAsDeliveredUseCase';

export class SetAsDeliveredController {
  async handle(request: Request, response: Response) {
    const { deliveryman_id } = request;
    const { id } = request.params;

    const deliveryRepository = new DeliveryRepository();
    const setAsDeliveredUseCase = new SetAsDeliveredUseCase(deliveryRepository);
    setAsDeliveredUseCase.execute({ id, deliveryman_id });

    return response.sendStatus(204);
  }
}
