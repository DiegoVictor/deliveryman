import { Request, Response } from 'express';
import { ClientRepository } from '../../../../shared/infra/prisma/repositories/ClientRepository';

import { FindClientDeliveriesUseCase } from './FindClientDeliveriesUseCase';

export class FindClientDeliveriesController {
  async handle(request: Request, response: Response) {
    const { client_id } = request;

    const clientRepository = new ClientRepository();
    const findClientDeliveriesUseCase = new FindClientDeliveriesUseCase(
      clientRepository
    );
    const deliveries = await findClientDeliveriesUseCase.execute(client_id);

    return response.json(deliveries);
  }
}
