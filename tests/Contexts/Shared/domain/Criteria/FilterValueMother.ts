import FilterValue from '../../../../../src/Contexts/Shared/domain/Criteria/FilterValue';
import WordMother from '../WordMother';

export default class FilterValueMother {
  public static create(value?: string): FilterValue {
    return new FilterValue(value ?? WordMother.random());
  }
}
