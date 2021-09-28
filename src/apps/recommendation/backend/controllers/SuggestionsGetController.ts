import { Request, Response } from 'express';
import httpStatus from 'http-status';
import SearchSuggestionsByCriteriaQuery from '../../../../Contexts/Recommendation/Suggestions/application/SearchByCriteria/SearchSuggestionsByCriteriaQuery';
import SuggestionsByCriteriaResponse from '../../../../Contexts/Recommendation/Suggestions/application/SearchByCriteria/SuggestionsByCriteriaResponse';
import Suggestion from '../../../../Contexts/Recommendation/Suggestions/domain/Suggestion';
import { QueryBus } from '../../../../Contexts/Shared/domain/Bus/Query/QueryBus';
import { Controller } from './Controller';

type FilterType = {
  value: string;
  operator: string;
  field: string;
};

export default class SuggestionsGetController implements Controller {
  private queryBus: QueryBus;

  constructor(queryBus: QueryBus) {
    this.queryBus = queryBus;
  }

  async invoke(req: Request, res: Response): Promise<void> {
    const { query: queryParams } = req;

    const { filters, orderBy, order, limit, offset } = queryParams;

    const query = new SearchSuggestionsByCriteriaQuery(
      this.parseFilters(filters as Array<FilterType>),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );

    const queryResponse: SuggestionsByCriteriaResponse = await this.queryBus.inquire(query);

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send(SuggestionsGetController.toResponse(queryResponse.suggestions));
  }

  private parseFilters(params: Array<FilterType>): Array<Map<string, string>> {
    if (!params) {
      return [];
    }

    return params.map(filter => {
      const field = filter.field;
      const value = filter.value;
      const operator = filter.operator;

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value]
      ]);
    });
  }

  private static toResponse(suggestions: Array<Suggestion>) {
    return suggestions.map(suggestion => ({
      id: suggestion.id.toString()
    }));
  }
}
