import { AggregateRoot } from '../../../Shared/domain/Aggregate/AggregateRoot';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import ProfileCreatedDomainEvent from './ProfileCreatedDomainEvent';
import ProfileName from './ProfileName';

export default class Profile extends AggregateRoot {
  readonly id: ProfileId;
  readonly name: ProfileName;

  constructor(id: ProfileId, name: ProfileName) {
    super();
    this.id = id;
    this.name = name;
  }

  static create(id: ProfileId, name: ProfileName): Profile {
    const profile = new Profile(id, name);
    const event = new ProfileCreatedDomainEvent({
      id: profile.id.value,
      name: profile.name.value
    });

    profile.record(event);

    return profile;
  }

  static fromPrimitives(plainData: { id: string; name: string }): Profile {
    return new Profile(new ProfileId(plainData.id), new ProfileName(plainData.name));
  }

  toPrimitives(): Object {
    return {
      id: this.id.value,
      name: this.name.value
    };
  }
}
