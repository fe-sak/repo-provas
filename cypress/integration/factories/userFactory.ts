/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';

export default function userFactory() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
}
