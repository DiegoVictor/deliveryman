import { Request, Response } from 'express';

import { SetAsDeliveredUseCase } from './SetAsDeliveredUseCase';

export class SetAsDeliveredController {
  async handle(request: Request, response: Response) {
    const { deliveryman_id } = request;
    const { id } = request.params;

    const setAsDeliveredUseCase = new SetAsDeliveredUseCase();
    setAsDeliveredUseCase.execute({ id, deliveryman_id });

    return response.sendStatus(204);
  }
}
