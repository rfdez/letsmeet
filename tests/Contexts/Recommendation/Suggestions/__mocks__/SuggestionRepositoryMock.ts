import Suggestion from '../../../../../src/Contexts/Recommendation/Suggestions/domain/Suggestion';
import SuggestionRepository from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionRepository';
import Criteria from '../../../../../src/Contexts/Shared/domain/Criteria/Criteria';

export default class SuggestionRepositoryMock implements SuggestionRepository {
  private mockSearchAll = jest.fn();
  private mockSave = jest.fn();
  private mockMatching = jest.fn();
  private suggestions: Array<Suggestion> = [];

  returnOnSearchAll(suggestions: Array<Suggestion>) {
    this.suggestions = suggestions;
  }

  returnOnMatching(suggestions: Array<Suggestion>) {
    this.suggestions = suggestions;
  }

  async searchAll(): Promise<Suggestion[]> {
    this.mockSearchAll();
    return this.suggestions;
  }

  assertSearchAll() {
    expect(this.mockSearchAll).toHaveBeenCalled();
  }

  async save(suggestion: Suggestion): Promise<void> {
    this.mockSave(suggestion);
  }

  assertSaveHasBeenCalledWith(suggestion: Suggestion) {
    expect(this.mockSave).toHaveBeenCalledWith(suggestion);
  }

  async matching(criteria: Criteria): Promise<Suggestion[]> {
    this.mockMatching(criteria);
    return this.suggestions;
  }

  assertMatchingHasBeenCalledWith() {
    expect(this.mockMatching).toHaveBeenCalled();
  }
}
