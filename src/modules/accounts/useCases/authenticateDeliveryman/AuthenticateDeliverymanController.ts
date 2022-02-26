import { Request, Response } from 'express';

import { DeliverymanRepository } from '@repositories/DeliverymanRepository';
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const deliverymanRepository = new DeliverymanRepository();
    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      deliverymanRepository
    );
    const token = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json({ token });
  }
}
