import ProfileId from '../../../../../src/Contexts/User/Shared/domain/Profiles/ProfileId';
import Profile from '../../../../../src/Contexts/User/Profiles/domain/Profile';
import ProfileName from '../../../../../src/Contexts/User/Profiles/domain/ProfileName';
import CreateProfileCommand from '../../../../../src/Contexts/User/Profiles/application/CreateProfileCommand';
import ProfileIdMother from '../../Shared/domain/Profiles/ProfileIdMother';
import ProfileNameMother from './ProfileNameMother';

export default class ProfileMother {
  static create(id: ProfileId, name: ProfileName): Profile {
    return new Profile(id, name);
  }

  static fromCommand(command: CreateProfileCommand): Profile {
    return this.create(ProfileIdMother.create(command.id), ProfileNameMother.create(command.name));
  }

  static random(): Profile {
    return this.create(ProfileIdMother.random(), ProfileNameMother.random());
  }
}
