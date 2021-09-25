import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import ProfileName from '../domain/ProfileName';
import { ProfileRepository } from '../domain/ProfileRepository';
import Profile from '../domain/Profile';
import { EventBus } from '../../../Shared/domain/Bus/Event/EventBus';

type Params = {
  profileId: ProfileId;
  profileName: ProfileName;
};

export default class ProfileCreator {
  private repository: ProfileRepository;
  private eventBus: EventBus;

  constructor(repository: ProfileRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async invoke({ profileId, profileName }: Params): Promise<void> {
    const profile = Profile.create(profileId, profileName);

    await this.repository.save(profile);
    await this.eventBus.publish(profile.pullDomainEvents());
  }
}
