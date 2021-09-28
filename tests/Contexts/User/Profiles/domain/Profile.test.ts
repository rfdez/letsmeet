import Profile from '../../../../../src/Contexts/User/Profiles/domain/Profile';
import ProfileIdMother from '../../Shared/domain/Profiles/ProfileIdMother';
import CreateProfileCommandMother from '../application/Create/CreateProfileCommandMother';
import ProfileAgeMother from './ProfileAgeMother';
import ProfileGenderMother from './ProfileGenderMother';
import ProfileLocationMother from './ProfileLocationMother';
import ProfileMother from './ProfileMother';
import ProfileNameMother from './ProfileNameMother';

describe('Profile', () => {
  it('should return a new Profile instance', () => {
    const command = CreateProfileCommandMother.random();
    const profile = ProfileMother.fromCommand(command);

    expect(profile.id.value).toBe(command.id);
    expect(profile.name.value).toBe(command.name);
    expect(profile.age.value).toBe(command.age);
    expect(profile.location.value).toBe(command.location);
    expect(profile.gender.value).toBe(command.gender);
  });

  it('should record a ProfileCreatedDomainEvent after its creation', () => {
    const profile = Profile.create(
      ProfileIdMother.random(),
      ProfileNameMother.random(),
      ProfileAgeMother.random(),
      ProfileLocationMother.random(),
      ProfileGenderMother.random()
    );

    const events = profile.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('profile.created');
  });
});
