import ProfileAge from '../../../../../src/Contexts/User/Profiles/domain/ProfileAge';
import IntegerMother from '../../../Shared/domain/IntegerMother';

export default class ProfileAgeMother {
  public static create(value: number): ProfileAge {
    return new ProfileAge(value);
  }

  public static random(): ProfileAge {
    return this.create(IntegerMother.random());
  }
}
