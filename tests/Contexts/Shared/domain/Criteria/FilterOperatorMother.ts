import FilterOperator, { Operator } from '../../../../../src/Contexts/Shared/domain/Criteria/FilterOperator';

export default class FilterOperatorMother {
  public static create(operator?: string): FilterOperator {
    return FilterOperator.fromValue(operator ?? this.random());
  }

  private static random() {
    const values = Object.keys(Operator);
    return values[Math.floor(Math.random() * values.length)];
  }
}
