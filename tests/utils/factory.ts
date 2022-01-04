import faker from 'faker';
import factory from 'factory-girl';

import { IAccount } from '../../src/modules/accounts/contracts/IAccount';

factory.define<IAccount>(
  'Account',
  {},
  {
    username: faker.internet.userName,
    password: faker.internet.password,
  }
);

export default factory;
