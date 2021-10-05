import ProfileId from '../../../Shared/domain/Profiles/ProfileId';
import ProfileNotExist from '../../domain/ProfileNotExist';
import ProfileRepository from '../../domain/ProfileRepository';
import FindProfileResponse from './FindProfileResponse';

type Params = {
  profileId: ProfileId;
};

export default class ProfileFinder {
  private repository: ProfileRepository;

  constructor(repository: ProfileRepository) {
    this.repository = repository;
  }

  async invoke({ profileId }: Params): Promise<FindProfileResponse> {
    const profile = await this.repository.search(profileId);
    if (!profile) {
      throw new ProfileNotExist();
    }
    return new FindProfileResponse(profile);
  }
}
