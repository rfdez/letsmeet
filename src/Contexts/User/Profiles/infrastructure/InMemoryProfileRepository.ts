import { ProfileRepository } from '../domain/ProfileRepository';
import Profile from '../domain/Profile';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import ProfileName from '../domain/ProfileName';

export default class InMemoryProfileRepository implements ProfileRepository {
  private profile: Profile;

  constructor() {
    this.profile = new Profile(ProfileId.random(), new ProfileName('Pepe'));
  }

  async search(): Promise<Profile> {
    return this.profile;
  }

  async save(profile: Profile): Promise<void> {
    this.profile = profile;
  }
}
