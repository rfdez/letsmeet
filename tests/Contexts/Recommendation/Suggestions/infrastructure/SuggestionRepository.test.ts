import container from '../../../../../src/apps/recommendation/backend/dependency-injection';
import Suggestion from '../../../../../src/Contexts/Recommendation/Suggestions/domain/Suggestion';
import ElasticSuggestionRepository from '../../../../../src/Contexts/Recommendation/Suggestions/infrastructure/persistence/elastic/ElasticSuggestionRepository';
import EnvironmentArranger from '../../../Shared/infrastructure/Arranger/EnvironmentArranger';
import SuggestionCriteriaMother from '../domain/SuggestionCriteriaMother';
import SuggestionMother from '../domain/SuggestionMother';

const repository: ElasticSuggestionRepository = container.get('Recommendation.suggestions.SuggestionRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Recommendation.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterEach(async () => {
  await (await environmentArranger).arrange();
});

describe('SuggestionRepository', () => {
  describe('#save', () => {
    it('should be able to persist the same suggestion twice', async () => {
      const suggestion = SuggestionMother.random();

      await repository.save(suggestion);
      await repository.save(suggestion);

      const persistedSuggestions = await repository.searchAll();

      expect(persistedSuggestions).toHaveLength(1);
      expect(persistedSuggestions).toEqual([suggestion]);
    });
  });

  describe('#searchAll', () => {
    it('should return the existing suggestions', async () => {
      const suggestions = [SuggestionMother.random(), SuggestionMother.random()];

      await Promise.all(suggestions.map(async suggestion => repository.save(suggestion)));

      const expectedSuggestions = await repository.searchAll();

      expect(suggestions).toHaveLength(expectedSuggestions.length);
      expect(suggestions.sort(sort)).toEqual(expectedSuggestions.sort(sort));
    });
  });

  describe('#searchByCriteria', () => {
    it('should return all suggestions', async () => {
      const suggestions = [
        SuggestionMother.withLocation('Bilbao'),
        SuggestionMother.withLocation('Valencia'),
        SuggestionMother.withLocation('Bilbao')
      ];

      await Promise.all(suggestions.map(async suggestion => repository.save(suggestion)));
      const result = await repository.matching(SuggestionCriteriaMother.withoutFilters());

      expect(result).toHaveLength(3);
    });

    it('should return suggestions using a criteria sorting by id', async () => {
      const suggestions = [
        SuggestionMother.withLocation('valencia'),
        SuggestionMother.withLocation('valencia'),
        SuggestionMother.random()
      ];

      await Promise.all(suggestions.map(async suggestion => repository.save(suggestion)));
      const result = await repository.matching(SuggestionCriteriaMother.locationContainsSortAscById('valencia'));

      const expectedSuggestions = suggestions.slice(0, 2);
      expect(result).toHaveLength(2);
      expect(expectedSuggestions.sort(sort)).toEqual(result);
    });

    it('should return suggestions using a criteria age range filter and sorting by id', async () => {
      const suggestions = [SuggestionMother.withAge(23), SuggestionMother.withAge(23), SuggestionMother.withAge(34)];

      await Promise.all(suggestions.map(async suggestion => repository.save(suggestion)));

      const result = await repository.matching(SuggestionCriteriaMother.ageRange(18, 30));

      const expectedSuggestions = suggestions.slice(0, 2);
      expect(result).toHaveLength(2);
      expect(expectedSuggestions.sort(sort)).toEqual(result);
    });
  });
});

function sort(firstSuggestion: Suggestion, secondSuggestion: Suggestion): number {
  return firstSuggestion?.id?.value.localeCompare(secondSuggestion?.id?.value);
}
