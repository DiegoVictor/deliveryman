import { Request, Response } from 'express';
import { DeliveryRepository } from '../../infra/prisma/repositories/DeliveryRepository';

import { SetDeliveryDeliverymanUseCase } from './SetDeliveryDeliverymanUseCase';

export class SetDeliveryDeliverymanController {
  async handle(request: Request, response: Response) {
    const { deliveryman_id } = request;
    const { id } = request.params;

    const deliveryRepository = new DeliveryRepository();
    const setDeliveryDeliverymanUseCase = new SetDeliveryDeliverymanUseCase(
      deliveryRepository
    );
    await setDeliveryDeliverymanUseCase.execute({ id, deliveryman_id });

    return response.sendStatus(204);
  }
}
