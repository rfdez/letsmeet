import Suggestion from '../../domain/Suggestion';

export default class SuggestionsByCriteriaResponse {
  readonly suggestions: Array<Suggestion>;

  constructor(suggestions: Array<Suggestion>) {
    this.suggestions = suggestions;
  }
}
