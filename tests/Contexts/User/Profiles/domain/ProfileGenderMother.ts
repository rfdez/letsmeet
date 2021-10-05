import ProfileGender from '../../../../../src/Contexts/User/Profiles/domain/ProfileGender';
import MotherCreator from '../../../Shared/domain/MotherCreator';

export default class ProfileGenderMother {
  static create(value: string): ProfileGender {
    return new ProfileGender(value);
  }

  static random(): ProfileGender {
    return this.create(MotherCreator.random().name.gender());
  }
}
