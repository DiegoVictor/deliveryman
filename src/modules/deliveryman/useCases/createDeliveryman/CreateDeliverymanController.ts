import { Request, Response } from 'express';

import { DeliverymanRepository } from '../../../../shared/infra/prisma/repositories/DeliverymanRepository';
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const deliverymanRepository = new DeliverymanRepository();
    const createDeliverymanUseCase = new CreateDeliverymanUseCase(
      deliverymanRepository
    );
    const result = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(result);
  }
}
