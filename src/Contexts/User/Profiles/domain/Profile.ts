import { AggregateRoot } from '../../../Shared/domain/Aggregate/AggregateRoot';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import ProfileAge from './ProfileAge';
import ProfileCreatedDomainEvent from './ProfileCreatedDomainEvent';
import ProfileGender from './ProfileGender';
import ProfileLocation from './ProfileLocation';
import ProfileName from './ProfileName';

export default class Profile extends AggregateRoot {
  readonly id: ProfileId;
  readonly name: ProfileName;
  readonly age: ProfileAge;
  readonly location: ProfileLocation;
  readonly gender: ProfileGender;

  constructor(id: ProfileId, name: ProfileName, age: ProfileAge, location: ProfileLocation, gender: ProfileGender) {
    super();
    this.id = id;
    this.name = name;
    this.age = age;
    this.location = location;
    this.gender = gender;
  }

  static create(
    id: ProfileId,
    name: ProfileName,
    age: ProfileAge,
    location: ProfileLocation,
    gender: ProfileGender
  ): Profile {
    const profile = new Profile(id, name, age, location, gender);
    const event = new ProfileCreatedDomainEvent({
      id: profile.id.value,
      name: profile.name.value,
      age: profile.age.value,
      location: profile.location.value,
      gender: profile.gender.value
    });

    profile.record(event);

    return profile;
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    age: number;
    location: string;
    gender: string;
  }): Profile {
    return new Profile(
      new ProfileId(plainData.id),
      new ProfileName(plainData.name),
      new ProfileAge(plainData.age),
      new ProfileLocation(plainData.location),
      new ProfileGender(plainData.gender)
    );
  }

  toPrimitives(): Object {
    return {
      id: this.id.value,
      name: this.name.value,
      age: this.age.value,
      location: this.location.value,
      gender: this.gender.value
    };
  }
}
