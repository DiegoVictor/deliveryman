import { Request, Response } from 'express';

import { ClientRepository } from '@repositories/ClientRepository';
import { CreateClientUseCase } from './CreateClientUseCase';

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const clientRepository = new ClientRepository();
    const createClientUseCase = new CreateClientUseCase(clientRepository);
    const result = await createClientUseCase.execute({ username, password });

    return response.status(201).json(result);
  }
}
