import { Request, Response } from 'express';
import { ClientRepository } from '../../../../shared/infra/prisma/repositories/ClientRepository';

import { AuthenticateClientUseCase } from './AuthenticateClientUseCase';

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const clientRepository = new ClientRepository();
    const authenticateClientUseCase = new AuthenticateClientUseCase(
      clientRepository
    );
    const token = await authenticateClientUseCase.execute({
      username,
      password,
    });

    return response.json({ token });
  }
}
