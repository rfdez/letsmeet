import MotherCreator from './MotherCreator';

export default class IntegerMother {
  static random(min?: number, max?: number): number {
    return MotherCreator.random().datatype.number({ min, max });
  }
}
