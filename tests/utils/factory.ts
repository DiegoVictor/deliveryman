import faker from 'faker';
import factory from 'factory-girl';

import { IDelivery } from '../../src/modules/deliveries/contracts/IDelivery';
import { IAccount } from '../../src/modules/accounts/contracts/IAccount';

factory.define<IAccount>(
  'Account',
  {},
  {
    username: faker.internet.userName,
    password: faker.internet.password,
  }
);

factory.define<IDelivery>(
  'Delivery',
  {},
  {
    client_id: faker.datatype.uuid,
    deliveryman_id: null,
    product_name: faker.commerce.productName,
    delivered_at: null,
    created_at: () => new Date(),
  }
);

export default factory;
