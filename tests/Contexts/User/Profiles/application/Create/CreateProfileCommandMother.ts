import CreateProfileCommand from '../../../../../../src/Contexts/User/Profiles/application/Create/CreateProfileCommand';
import ProfileIdMother from '../../../Shared/domain/Profiles/ProfileIdMother';
import ProfileAgeMother from '../../domain/ProfileAgeMother';
import ProfileGenderMother from '../../domain/ProfileGenderMother';
import ProfileLocationMother from '../../domain/ProfileLocationMother';
import ProfileNameMother from '../../domain/ProfileNameMother';

export default class CreateProfileCommandMother {
  public static create(id: string, name: string, age: number, location: string, gender: string): CreateProfileCommand {
    return new CreateProfileCommand({ id, name, age, location, gender });
  }

  public static random(): CreateProfileCommand {
    return this.create(
      ProfileIdMother.random().value,
      ProfileNameMother.random().value,
      ProfileAgeMother.random().value,
      ProfileLocationMother.random().value,
      ProfileGenderMother.random().value
    );
  }
}
