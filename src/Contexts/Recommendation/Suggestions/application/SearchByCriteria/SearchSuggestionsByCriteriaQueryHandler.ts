import Query from '../../../../Shared/domain/Bus/Query/Query';
import QueryHandler from '../../../../Shared/domain/Bus/Query/QueryHandler';
import Filters from '../../../../Shared/domain/Criteria/Filters';
import Order from '../../../../Shared/domain/Criteria/Order';
import SearchSuggestionsByCriteriaQuery from './SearchSuggestionsByCriteriaQuery';
import SuggestionsByCriteriaResponse from './SuggestionsByCriteriaResponse';
import SuggestionsByCriteriaSearcher from './SuggestionsByCriteriaSearcher';

export default class SearchSuggestionsByCriteriaQueryHandler
  implements QueryHandler<SearchSuggestionsByCriteriaQuery, SuggestionsByCriteriaResponse>
{
  private searcher: SuggestionsByCriteriaSearcher;

  constructor(searcher: SuggestionsByCriteriaSearcher) {
    this.searcher = searcher;
  }

  subscribedTo(): Query {
    return SearchSuggestionsByCriteriaQuery;
  }

  handle(query: SearchSuggestionsByCriteriaQuery): Promise<SuggestionsByCriteriaResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.invoke(filters, order, query.limit, query.offset);
  }
}
