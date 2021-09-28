import ProfileLocation from '../../../../../src/Contexts/User/Profiles/domain/ProfileLocation';
import WordMother from '../../../Shared/domain/WordMother';

export default class ProfileLocationMother {
  public static create(value: string): ProfileLocation {
    return new ProfileLocation(value);
  }

  public static random(): ProfileLocation {
    return this.create(WordMother.random());
  }
}
