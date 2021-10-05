import Criteria from '../../../../Shared/domain/Criteria/Criteria';
import Filters from '../../../../Shared/domain/Criteria/Filters';
import Order from '../../../../Shared/domain/Criteria/Order';
import SuggestionRepository from '../../domain/SuggestionRepository';
import SuggestionsByCriteriaResponse from './SuggestionsByCriteriaResponse';

export default class SuggestionsByCriteriaSearcher {
  private repository: SuggestionRepository;

  constructor(repository: SuggestionRepository) {
    this.repository = repository;
  }

  async invoke(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Promise<SuggestionsByCriteriaResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const suggestions = await this.repository.matching(criteria);

    return new SuggestionsByCriteriaResponse(suggestions);
  }
}
