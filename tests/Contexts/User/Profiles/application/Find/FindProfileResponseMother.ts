import FindProfileResponse from '../../../../../../src/Contexts/User/Profiles/application/Find/FindProfileResponse';
import Profile from '../../../../../../src/Contexts/User/Profiles/domain/Profile';

export default class FindProfileResponseMother {
  public static create(profile: Profile) {
    return new FindProfileResponse(profile);
  }
}
