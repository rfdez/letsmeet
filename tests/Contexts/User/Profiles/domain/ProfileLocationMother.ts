import ProfileLocation from '../../../../../src/Contexts/User/Profiles/domain/ProfileLocation';
import MotherCreator from '../../../Shared/domain/MotherCreator';

export default class ProfileLocationMother {
  static create(value: string): ProfileLocation {
    return new ProfileLocation(value);
  }

  static random(): ProfileLocation {
    return this.create(MotherCreator.random().address.cityName());
  }
}
