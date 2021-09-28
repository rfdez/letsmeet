import FilterField from '../../../../../src/Contexts/Shared/domain/Criteria/FilterField';
import WordMother from '../WordMother';

export default class FilterFieldMother {
  public static create(fielName?: string): FilterField {
    return new FilterField(fielName ?? WordMother.random());
  }
}
