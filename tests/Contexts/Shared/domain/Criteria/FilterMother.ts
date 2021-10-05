import Filter from '../../../../../src/Contexts/Shared/domain/Criteria/Filter';
import FilterField from '../../../../../src/Contexts/Shared/domain/Criteria/FilterField';
import FilterOperator from '../../../../../src/Contexts/Shared/domain/Criteria/FilterOperator';
import FilterValue from '../../../../../src/Contexts/Shared/domain/Criteria/FilterValue';
import FilterFieldMother from './FilterFieldMother';
import FilterOperatorMother from './FilterOperatorMother';

export default class FilterMother {
  static create(field?: FilterField, operator?: FilterOperator, value?: FilterValue): Filter {
    return new Filter(
      field ?? FilterFieldMother.create(),
      operator ?? FilterOperatorMother.create(),
      value ?? FilterOperatorMother.create()
    );
  }

  static fromValues(values: Map<string, string>): Filter {
    return Filter.fromValues(values);
  }
}
