import ProfileName from '../../../../../src/Contexts/User/Profiles/domain/ProfileName';
import MotherCreator from '../../../Shared/domain/MotherCreator';

export default class ProfileNameMother {
  static create(value: string): ProfileName {
    return new ProfileName(value);
  }

  static random(): ProfileName {
    return this.create(MotherCreator.random().name.firstName());
  }
}
