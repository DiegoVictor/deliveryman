import faker from 'faker';
import factory from 'factory-girl';

export interface Person {
  id?: string;
  username: string;
  password: string;
}

export default factory;
