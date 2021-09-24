import ProfileRepositoryMock from '../__mocks__/ProfileRepositoryMock';
import CreateProfileCommandHandler from '../../../../../src/Contexts/User/Profiles/application/CreateProfileCommandHandler';
import EventBusMock from '../__mocks__/EventBusMock';
import ProfileCreator from '../../../../../src/Contexts/User/Profiles/application/ProfileCreator';
import CreateProfileCommandMother from './CreateProfileCommandMother';
import ProfileMother from '../domain/ProfileMother';

let repository: ProfileRepositoryMock;
let handler: CreateProfileCommandHandler;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new ProfileRepositoryMock();
  const creator = new ProfileCreator(repository, eventBus);
  handler = new CreateProfileCommandHandler(creator);
});

describe('ProfileCreator', () => {
  it('should create a valid profile', async () => {
    const command = CreateProfileCommandMother.random();
    await handler.handle(command);

    const profile = ProfileMother.fromCommand(command);
    repository.assertLastSavedProfileIs(profile);
  });
});
