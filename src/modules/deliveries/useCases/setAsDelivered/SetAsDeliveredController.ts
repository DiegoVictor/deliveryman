import { Request, Response } from 'express';

import { DeliveryRepository } from '@modules/deliveries/infra/prisma/repositories/DeliveryRepository';
import { SetAsDeliveredUseCase } from './SetAsDeliveredUseCase';

export class SetAsDeliveredController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deliveryRepository = new DeliveryRepository();
    const setAsDeliveredUseCase = new SetAsDeliveredUseCase(deliveryRepository);
    setAsDeliveredUseCase.execute(id);

    return response.sendStatus(204);
  }
}
