import Profile from '../../../../../src/Contexts/User/Profiles/domain/Profile';
import ProfileCreatedDomainEvent from '../../../../../src/Contexts/User/Profiles/domain/ProfileCreatedDomainEvent';

export default class ProfileCreatedDomainEventMother {
  public static create({
    id,
    name,
    age,
    location,
    gender,
    eventId,
    occurredOn
  }: {
    id: string;
    name: string;
    age: number;
    location: string;
    gender: string;
    eventId?: string;
    occurredOn?: Date;
  }): ProfileCreatedDomainEvent {
    return new ProfileCreatedDomainEvent({
      id,
      name,
      age,
      location,
      gender,
      eventId,
      occurredOn
    });
  }

  static fromProfile(profile: Profile): ProfileCreatedDomainEvent {
    return new ProfileCreatedDomainEvent({
      id: profile.id.value,
      name: profile.name.value,
      age: profile.age.value,
      location: profile.location.value,
      gender: profile.gender.value
    });
  }
}
