import { Request, Response } from 'express';

import { DeliveryRepository } from '../../infra/prisma/repositories/DeliveryRepository';
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { client_id } = request;
    const { product_name } = request.body;

    const deliveryRepository = new DeliveryRepository();
    const createDeliveryUseCase = new CreateDeliveryUseCase(deliveryRepository);
    const delivery = await createDeliveryUseCase.execute({
      client_id,
      product_name,
    });

    return response.status(201).json(delivery);
  }
}
