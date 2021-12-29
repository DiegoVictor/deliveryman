import faker from 'faker';
import factory from 'factory-girl';

export interface Person {
  id?: string;
  username: string;
  password: string;
}

factory.define<Person>(
  'Person',
  {},
  {
    username: faker.internet.userName,
    password: faker.internet.password,
  }
);

export default factory;
