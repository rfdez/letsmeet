import MotherCreator from './MotherCreator';

export default class UuidMother {
  static random(): string {
    return MotherCreator.random().datatype.uuid();
  }
}
