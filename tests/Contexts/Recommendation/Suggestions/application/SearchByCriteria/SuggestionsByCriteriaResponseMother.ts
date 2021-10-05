import SuggestionsByCriteriaResponse from '../../../../../../src/Contexts/Recommendation/Suggestions/application/SearchByCriteria/SuggestionsByCriteriaResponse';
import Suggestion from '../../../../../../src/Contexts/Recommendation/Suggestions/domain/Suggestion';

export default class SuggestionsByCriteriaResponseMother {
  static create(suggestions: Array<Suggestion>): SuggestionsByCriteriaResponse {
    return new SuggestionsByCriteriaResponse(suggestions);
  }
}
