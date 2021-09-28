import ProfileGender from '../../../../../src/Contexts/User/Profiles/domain/ProfileGender';
import WordMother from '../../../Shared/domain/WordMother';

export default class ProfileGenderMother {
  public static create(value: string): ProfileGender {
    return new ProfileGender(value);
  }

  public static random(): ProfileGender {
    return this.create(WordMother.random());
  }
}
