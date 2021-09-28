import Criteria from '../../../Shared/domain/Criteria/Criteria';
import Suggestion from './Suggestion';

export interface SuggestionRepository {
  searchAll(): Promise<Array<Suggestion>>;

  save(suggestion: Suggestion): Promise<void>;

  matching(criteria: Criteria): Promise<Array<Suggestion>>;
}
