import EventBus from '../../../../Shared/domain/Bus/Event/EventBus';
import ProfileId from '../../../Shared/domain/Profiles/ProfileId';
import Profile from '../../domain/Profile';
import ProfileAge from '../../domain/ProfileAge';
import ProfileGender from '../../domain/ProfileGender';
import ProfileLocation from '../../domain/ProfileLocation';
import ProfileName from '../../domain/ProfileName';
import ProfileRepository from '../../domain/ProfileRepository';

type Params = {
  profileId: ProfileId;
  profileName: ProfileName;
  profileAge: ProfileAge;
  profileLocation: ProfileLocation;
  profileGender: ProfileGender;
};

export default class ProfileCreator {
  private repository: ProfileRepository;
  private eventBus: EventBus;

  constructor(repository: ProfileRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async invoke({ profileId, profileName, profileAge, profileLocation, profileGender }: Params): Promise<void> {
    const profile = Profile.create(profileId, profileName, profileAge, profileLocation, profileGender);

    await this.repository.save(profile);
    await this.eventBus.publish(profile.pullDomainEvents());
  }
}
