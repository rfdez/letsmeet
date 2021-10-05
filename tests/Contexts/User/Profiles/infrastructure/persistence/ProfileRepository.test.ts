import container from '../../../../../../src/apps/user/backend/dependency-injection';
import ProfileRepository from '../../../../../../src/Contexts/User/Profiles/domain/ProfileRepository';
import EnvironmentArranger from '../../../../Shared/infrastructure/Arranger/EnvironmentArranger';
import ProfileMother from '../../domain/ProfileMother';

const repository: ProfileRepository = container.get('User.profiles.ProfileRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('User.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('ProfileRepository', () => {
  describe('#save', () => {
    it('should save a profile', async () => {
      const profile = ProfileMother.random();

      await repository.save(profile);
    });
  });

  describe('#search', () => {
    it('should return an exiting profile', async () => {
      const expectedProfile = ProfileMother.random();
      await repository.save(expectedProfile);

      const profile = await repository.search(expectedProfile.id);

      expect(expectedProfile).toEqual(profile);
    });

    it('should not return a non exiting profile', async () => {
      expect(await repository.search(ProfileMother.random().id)).toBeFalsy();
    });
  });
});
