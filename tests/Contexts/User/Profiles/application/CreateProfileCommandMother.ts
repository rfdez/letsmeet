import CreateProfileCommand from '../../../../../src/Contexts/User/Profiles/application/CreateProfileCommand';
import ProfileIdMother from '../../Shared/domain/Profiles/ProfileIdMother';
import ProfileNameMother from '../domain/ProfileNameMother';

export default class CreateProfileCommandMother {
  static create(id: string, name: string): CreateProfileCommand {
    return new CreateProfileCommand({ id, name });
  }

  static random(): CreateProfileCommand {
    return this.create(ProfileIdMother.random().value, ProfileNameMother.random().value);
  }
}
