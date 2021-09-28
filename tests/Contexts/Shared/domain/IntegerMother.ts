import MotherCreator from './MotherCreator';

export default class IntegerMother {
  public static random(max?: number): number {
    return MotherCreator.random().datatype.number(max);
  }
}
