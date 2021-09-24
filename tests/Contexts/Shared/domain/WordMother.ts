import MotherCreator from './MotherCreator';

export default class WordMother {
  static random(): string {
    return MotherCreator.random().lorem.word();
  }
}
