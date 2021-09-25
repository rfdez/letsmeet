import Faker from 'faker';

export default class MotherCreator {
  static random(): Faker.FakerStatic {
    return Faker;
  }
}
