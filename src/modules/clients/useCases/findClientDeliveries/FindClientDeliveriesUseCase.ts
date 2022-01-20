import { IClientRepository } from '../../../accounts/contracts/IClientRepository';

export class FindClientDeliveriesUseCase {
  private repository: IClientRepository;

  constructor(repository: IClientRepository) {
    this.repository = repository;
  }

  async execute(client_id: string) {
    return this.repository.findById(client_id);
  }
}
