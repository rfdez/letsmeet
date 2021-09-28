import bodybuilder, { Bodybuilder } from 'bodybuilder';
import Criteria from '../../../domain/Criteria/Criteria';
import Filter from '../../../domain/Criteria/Filter';
import { Operator } from '../../../domain/Criteria/FilterOperator';
import Filters from '../../../domain/Criteria/Filters';

export enum TypeQueryEnum {
  TERMS = 'terms',
  MATCH_ALL = 'match_all',
  RANGE = 'range',
  WILDCARD = 'wildcard'
}

type QueryObject = { type: TypeQueryEnum; field: string; value: string | object };

interface TransformerFunction<T, K> {
  (value: T): K;
}

export default class ElasticCriteriaConverter {
  private queryTransformers: Map<Operator, TransformerFunction<Filter, QueryObject>>;

  constructor() {
    this.queryTransformers = new Map<Operator, TransformerFunction<Filter, QueryObject>>([
      [Operator.EQUAL, ElasticCriteriaConverter.termsQuery],
      [Operator.NOT_EQUAL, ElasticCriteriaConverter.termsQuery],
      [Operator.GT, ElasticCriteriaConverter.greaterThanQuery],
      [Operator.LT, ElasticCriteriaConverter.lowerThanQuery],
      [Operator.CONTAINS, ElasticCriteriaConverter.wildcardQuery],
      [Operator.NOT_CONTAINS, ElasticCriteriaConverter.wildcardQuery]
    ]);
  }

  public convert(criteria: Criteria): Bodybuilder {
    let body = bodybuilder();

    body.from(criteria.offset || 0);
    body.size(criteria.limit || 1000);

    if (criteria.order.hasOrder()) {
      body.sort(criteria.order.orderBy.value, criteria.order.orderType.value);
    }

    if (criteria.hasFilters()) {
      body = this.generateQuery(body, criteria.filters);
    }

    return body;
  }

  protected generateQuery(body: Bodybuilder, filters: Filters): Bodybuilder {
    filters.filters.forEach(filter => {
      const { type, value, field } = this.queryForFilter(filter);

      if (filter.operator.isPositive()) {
        body.query(type, field, value);
      } else {
        body.notQuery(type, field, value);
      }
    });

    return body;
  }

  private queryForFilter(filter: Filter): QueryObject {
    const functionToApply = this.queryTransformers.get(filter.operator.value);

    if (!functionToApply) {
      throw Error(`Unexpected operator value ${filter.operator.value}`);
    }

    return functionToApply(filter);
  }

  private static termsQuery(filter: Filter): QueryObject {
    return { type: TypeQueryEnum.TERMS, field: filter.field.value, value: [filter.value.value] };
  }

  private static greaterThanQuery(filter: Filter): QueryObject {
    return { type: TypeQueryEnum.RANGE, field: filter.field.value, value: { gt: filter.value.value } };
  }

  private static lowerThanQuery(filter: Filter): QueryObject {
    return { type: TypeQueryEnum.RANGE, field: filter.field.value, value: { lt: filter.value.value } };
  }

  private static wildcardQuery(filter: Filter): QueryObject {
    return { type: TypeQueryEnum.WILDCARD, field: filter.field.value, value: `*${filter.value.value}*` };
  }
}
