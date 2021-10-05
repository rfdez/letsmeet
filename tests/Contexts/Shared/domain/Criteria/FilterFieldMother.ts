import FilterField from '../../../../../src/Contexts/Shared/domain/Criteria/FilterField';
import WordMother from '../WordMother';

export default class FilterFieldMother {
  static create(fieldName?: string): FilterField {
    return new FilterField(fieldName ?? WordMother.random());
  }
}
