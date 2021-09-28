import CreateProfileCommand from '../../../../../src/Contexts/User/Profiles/application/CreateProfileCommand';
import Profile from '../../../../../src/Contexts/User/Profiles/domain/Profile';
import ProfileAge from '../../../../../src/Contexts/User/Profiles/domain/ProfileAge';
import ProfileGender from '../../../../../src/Contexts/User/Profiles/domain/ProfileGender';
import ProfileLocation from '../../../../../src/Contexts/User/Profiles/domain/ProfileLocation';
import ProfileName from '../../../../../src/Contexts/User/Profiles/domain/ProfileName';
import ProfileId from '../../../../../src/Contexts/User/Shared/domain/Profiles/ProfileId';
import ProfileIdMother from '../../Shared/domain/Profiles/ProfileIdMother';
import ProfileAgeMother from './ProfileAgeMother';
import ProfileGenderMother from './ProfileGenderMother';
import ProfileLocationMother from './ProfileLocationMother';
import ProfileNameMother from './ProfileNameMother';

export default class ProfileMother {
  static create(
    id: ProfileId,
    name: ProfileName,
    age: ProfileAge,
    location: ProfileLocation,
    gender: ProfileGender
  ): Profile {
    return new Profile(id, name, age, location, gender);
  }

  static fromCommand(command: CreateProfileCommand): Profile {
    return this.create(
      ProfileIdMother.create(command.id),
      ProfileNameMother.create(command.name),
      ProfileAgeMother.create(command.age),
      ProfileLocationMother.create(command.location),
      ProfileGenderMother.create(command.gender)
    );
  }

  static random(): Profile {
    return this.create(
      ProfileIdMother.random(),
      ProfileNameMother.random(),
      ProfileAgeMother.random(),
      ProfileLocationMother.random(),
      ProfileGenderMother.random()
    );
  }
}
