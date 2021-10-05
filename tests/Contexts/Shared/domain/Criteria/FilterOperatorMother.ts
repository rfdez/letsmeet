import FilterOperator, { Operator } from '../../../../../src/Contexts/Shared/domain/Criteria/FilterOperator';

export default class FilterOperatorMother {
  static create(operator?: string): FilterOperator {
    return operator ? FilterOperator.fromValue(operator) : new FilterOperator(this.random());
  }

  private static random() {
    const options: Operator[] = Object.values(Operator);
    return options[Math.floor(Math.random() * options.length)];
  }
}
