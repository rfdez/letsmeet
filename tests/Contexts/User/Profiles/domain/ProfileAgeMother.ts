import ProfileAge from '../../../../../src/Contexts/User/Profiles/domain/ProfileAge';
import IntegerMother from '../../../Shared/domain/IntegerMother';

export default class ProfileAgeMother {
  private static readonly MIN_AGE = 18;

  static create(value: number): ProfileAge {
    return new ProfileAge(value);
  }

  static random(): ProfileAge {
    return this.create(IntegerMother.random(this.MIN_AGE));
  }
}
