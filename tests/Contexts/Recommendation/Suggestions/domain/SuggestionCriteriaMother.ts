import Criteria from '../../../../../src/Contexts/Shared/domain/Criteria/Criteria';
import Filter from '../../../../../src/Contexts/Shared/domain/Criteria/Filter';
import FilterField from '../../../../../src/Contexts/Shared/domain/Criteria/FilterField';
import FilterOperator, { Operator } from '../../../../../src/Contexts/Shared/domain/Criteria/FilterOperator';
import Filters from '../../../../../src/Contexts/Shared/domain/Criteria/Filters';
import FilterValue from '../../../../../src/Contexts/Shared/domain/Criteria/FilterValue';
import Order from '../../../../../src/Contexts/Shared/domain/Criteria/Order';

export default class SuggestionCriteriaMother {
  static withoutFilters(): Criteria {
    return new Criteria(new Filters([]), Order.fromValues());
  }

  static ageRange(min: number, max: number): Criteria {
    const filterField = new FilterField('age');

    const filterMinOperator = new FilterOperator(Operator.GT);
    const filterMaxOperator = new FilterOperator(Operator.LT);

    const filterMinValue = new FilterValue(min.toString());
    const filterMaxValue = new FilterValue(max.toString());

    const filterMinAge = new Filter(filterField, filterMinOperator, filterMinValue);
    const filterMaxAge = new Filter(filterField, filterMaxOperator, filterMaxValue);

    return new Criteria(new Filters([filterMinAge, filterMaxAge]), Order.asc('id'));
  }

  static locationContainsSortAscById(location: string): Criteria {
    const filterField = new FilterField('location');

    const filterOperator = new FilterOperator(Operator.CONTAINS);

    const filterValue = new FilterValue(location);

    const filter = new Filter(filterField, filterOperator, filterValue);

    return new Criteria(new Filters([filter]), Order.asc('id'));
  }
}
