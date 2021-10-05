import Suggestion from '../../domain/Suggestion';
import SuggestionAge from '../../domain/SuggestionAge';
import SuggestionGender from '../../domain/SuggestionGender';
import SuggestionId from '../../domain/SuggestionId';
import SuggestionLocation from '../../domain/SuggestionLocation';
import SuggestionRepository from '../../domain/SuggestionRepository';

export default class SuggestionCreator {
  private repository: SuggestionRepository;

  constructor(repository: SuggestionRepository) {
    this.repository = repository;
  }

  async invoke(id: string, age: number, gender: string, location: string) {
    const suggestion = new Suggestion(
      new SuggestionId(id),
      new SuggestionAge(age),
      new SuggestionGender(gender),
      new SuggestionLocation(location)
    );

    return this.repository.save(suggestion);
  }
}
