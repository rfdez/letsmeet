import ProfileId from '../../../../../../src/Contexts/User/Shared/domain/Profiles/ProfileId';
import UuidMother from '../../../../Shared/domain/UuidMother';

export default class ProfileIdMother {
  static create(value: string): ProfileId {
    return new ProfileId(value);
  }

  static creator() {
    return () => ProfileIdMother.random();
  }

  static random(): ProfileId {
    return this.create(UuidMother.random());
  }
}
