import ProfileName from '../../../../../src/Contexts/User/Profiles/domain/ProfileName';
import WordMother from '../../../Shared/domain/WordMother';

export default class ProfileNameMother {
  static create(value: string): ProfileName {
    return new ProfileName(value);
  }

  static random(): ProfileName {
    return this.create(WordMother.random());
  }
}
