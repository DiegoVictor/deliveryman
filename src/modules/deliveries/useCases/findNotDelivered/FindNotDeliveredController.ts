import { Request, Response } from 'express';

import { FindNotDeliveredUseCase } from './FindNotDeliveredUseCase';

export class FindNotDeliveredController {
  async handle(_: Request, response: Response) {
    const findNotDeliveredUseCase = new FindNotDeliveredUseCase();
    const deliveries = await findNotDeliveredUseCase.execute();

    return response.json(deliveries);
  }
}
