import SuggestionCreator from '../../../../../../src/Contexts/Recommendation/Suggestions/application/Create/SuggestionCreator';
import SuggestionRepositoryMock from '../../__mocks__/SuggestionRepositoryMock';
import SuggestionMother from '../../domain/SuggestionMother';

describe('SuggestionCreator', () => {
  it('should create a suggestion', async () => {
    const suggestion = SuggestionMother.random();

    const repository = new SuggestionRepositoryMock();
    const creator = new SuggestionCreator(repository);

    await creator.invoke(
      suggestion.id.toString(),
      suggestion.age.value,
      suggestion.gender.toString(),
      suggestion.location.toString()
    );

    repository.assertSaveHasBeenCalledWith(suggestion);
  });
});
