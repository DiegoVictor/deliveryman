import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createCLientUseCase = new CreateClientUseCase();
    const result = await createCLientUseCase.execute({ username, password });

    return response.status(201).json(result);
  }
}
