import CreateProfileCommandHandler from '../../../../../../src/Contexts/User/Profiles/application/Create/CreateProfileCommandHandler';
import ProfileCreator from '../../../../../../src/Contexts/User/Profiles/application/Create/ProfileCreator';
import EventBusMock from '../../__mocks__/EventBusMock';
import ProfileRepositoryMock from '../../__mocks__/ProfileRepositoryMock';
import ProfileMother from '../../domain/ProfileMother';
import CreateProfileCommandMother from './CreateProfileCommandMother';

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
