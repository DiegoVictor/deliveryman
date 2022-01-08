import { Request, Response } from 'express';

import { FindClientDeliveriesUseCase } from './FindClientDeliveriesUseCase';

export class FindClientDeliveriesController {
  async handle(request: Request, response: Response) {
    const { client_id } = request;

    const findClientDeliveriesUseCase = new FindClientDeliveriesUseCase();
    const deliveries = await findClientDeliveriesUseCase.execute(client_id);

    return response.json(deliveries);
  }
}
