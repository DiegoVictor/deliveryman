import { Request, Response } from 'express';

import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();
    const token = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json({ token });
  }
}
