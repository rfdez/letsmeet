import FindProfileQuery from '../../../../../../src/Contexts/User/Profiles/application/Find/FindProfileQuery';
import FindProfileQueryHandler from '../../../../../../src/Contexts/User/Profiles/application/Find/FindProfileQueryHandler';
import ProfileFinder from '../../../../../../src/Contexts/User/Profiles/application/Find/ProfileFinder';
import ProfileNotExist from '../../../../../../src/Contexts/User/Profiles/domain/ProfileNotExist';
import ProfileRepositoryMock from '../../__mocks__/ProfileRepositoryMock';
import ProfileMother from '../../domain/ProfileMother';
import FindProfileResponseMother from './FindProfileResponseMother';

describe('FindProfile QueryHandler', () => {
  let repository: ProfileRepositoryMock;

  beforeEach(() => {
    repository = new ProfileRepositoryMock();
  });

  it('should find an existing profile', async () => {
    const profile = ProfileMother.random();
    repository.returnOnSearch(profile);

    const handler = new FindProfileQueryHandler(new ProfileFinder(repository));

    const query = new FindProfileQuery(profile.id.value);
    const response = await handler.handle(query);

    repository.assertSearch();

    const expected = FindProfileResponseMother.create(profile);
    expect(expected).toEqual(response);
  });

  it('should throw an exception when profile does not exists', async () => {
    const handler = new FindProfileQueryHandler(new ProfileFinder(repository));
    const query = new FindProfileQuery(ProfileMother.random().id.value);
    await expect(handler.handle(query)).rejects.toBeInstanceOf(ProfileNotExist);
  });
});
