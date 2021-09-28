import Profile from '../../domain/Profile';

export default class FindProfileResponse {
  readonly profile: Profile;

  constructor(profile: Profile) {
    this.profile = profile;
  }
}
