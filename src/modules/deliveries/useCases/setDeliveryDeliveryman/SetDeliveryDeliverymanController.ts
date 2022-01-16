import { Request, Response } from 'express';

import { SetDeliveryDeliverymanUseCase } from './SetDeliveryDeliverymanUseCase';

export class SetDeliveryDeliverymanController {
  async handle(request: Request, response: Response) {
    const { deliveryman_id } = request;
    const { id } = request.params;

    const setDeliveryDeliverymanUseCase = new SetDeliveryDeliverymanUseCase();
    await setDeliveryDeliverymanUseCase.execute({ id, deliveryman_id });

    return response.sendStatus(204);
  }
}
