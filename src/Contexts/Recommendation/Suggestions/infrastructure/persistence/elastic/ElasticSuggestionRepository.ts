import Criteria from '../../../../../Shared/domain/Criteria/Criteria';
import ElasticRepository from '../../../../../Shared/infrastructure/persistence/elastic/ElasticRepository';
import Suggestion from '../../../domain/Suggestion';
import SuggestionRepository from '../../../domain/SuggestionRepository';

export default class ElasticSuggestionRepository extends ElasticRepository<Suggestion> implements SuggestionRepository {
  async searchAll(): Promise<Array<Suggestion>> {
    return this.searchAllInElastic(Suggestion.fromPrimitives);
  }

  async save(suggestion: Suggestion): Promise<void> {
    return this.persist(suggestion.id.value, suggestion);
  }

  async matching(criteria: Criteria): Promise<Array<Suggestion>> {
    return this.searchByCriteria(criteria, Suggestion.fromPrimitives);
  }
}
