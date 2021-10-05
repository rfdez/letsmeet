import SearchSuggestionsByCriteriaQuery from '../../../../../../src/Contexts/Recommendation/Suggestions/application/SearchByCriteria/SearchSuggestionsByCriteriaQuery';
import SearchSuggestionsByCriteriaQueryHandler from '../../../../../../src/Contexts/Recommendation/Suggestions/application/SearchByCriteria/SearchSuggestionsByCriteriaQueryHandler';
import SuggestionsByCriteriaSearcher from '../../../../../../src/Contexts/Recommendation/Suggestions/application/SearchByCriteria/SuggestionsByCriteriaSearcher';
import { OrderTypes } from '../../../../../../src/Contexts/Shared/domain/Criteria/OrderType';
import SuggestionRepositoryMock from '../../__mocks__/SuggestionRepositoryMock';
import SuggestionMother from '../../domain/SuggestionMother';
import SuggestionsByCriteriaResponseMother from './SuggestionsByCriteriaResponseMother';

describe('SearchSuggestionsByCriteria QueryHandler', () => {
  let repository: SuggestionRepositoryMock;

  beforeEach(() => {
    repository = new SuggestionRepositoryMock();
  });

  it('should find suggestions filter by criteria', async () => {
    const suggestions = [SuggestionMother.random(), SuggestionMother.random(), SuggestionMother.random()];
    repository.returnOnMatching(suggestions);

    const handler = new SearchSuggestionsByCriteriaQueryHandler(new SuggestionsByCriteriaSearcher(repository));

    const filterAge: Map<string, string> = new Map([
      ['field', 'age'],
      ['operator', '='],
      ['value', '23']
    ]);

    const filterGender: Map<string, string> = new Map([
      ['field', 'gender'],
      ['operator', 'CONTAINS'],
      ['value', 'other']
    ]);

    const filterLocation: Map<string, string> = new Map([
      ['field', 'location'],
      ['operator', 'CONTAINS'],
      ['value', 'Bilbao']
    ]);

    const filters: Array<Map<string, string>> = [filterAge, filterGender, filterLocation];

    const query = new SearchSuggestionsByCriteriaQuery(filters);
    const response = await handler.handle(query);

    const expected = SuggestionsByCriteriaResponseMother.create(suggestions);
    repository.assertMatchingHasBeenCalledWith();
    expect(expected).toEqual(response);
  });

  it('should find suggestions filter by criteria with order, limit and offset', async () => {
    const suggestions = [SuggestionMother.random(), SuggestionMother.random(), SuggestionMother.random()];
    repository.returnOnMatching(suggestions);

    const handler = new SearchSuggestionsByCriteriaQueryHandler(new SuggestionsByCriteriaSearcher(repository));

    const filterAge: Map<string, string> = new Map([
      ['field', 'age'],
      ['operator', '='],
      ['value', '23']
    ]);

    const filterGender: Map<string, string> = new Map([
      ['field', 'gender'],
      ['operator', 'CONTAINS'],
      ['value', 'other']
    ]);

    const filterLocation: Map<string, string> = new Map([
      ['field', 'location'],
      ['operator', 'CONTAINS'],
      ['value', 'Bilbao']
    ]);

    const filters: Array<Map<string, string>> = [filterAge, filterGender, filterLocation];
    const orderBy = 'location';
    const orderType = OrderTypes.ASC;

    const query = new SearchSuggestionsByCriteriaQuery(filters, orderBy, orderType, 5, 1);
    const response = await handler.handle(query);

    const expected = SuggestionsByCriteriaResponseMother.create(suggestions);
    repository.assertMatchingHasBeenCalledWith();
    expect(expected).toEqual(response);
  });
});
