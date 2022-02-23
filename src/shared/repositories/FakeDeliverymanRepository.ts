import { IAccount } from '../../modules/accounts/contracts/IAccount';

export class FakeDeliverymanRepository {
  private repository: IAccount[] = [];
}
