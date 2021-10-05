import OrderBy from '../../../../../src/Contexts/Shared/domain/Criteria/OrderBy';
import WordMother from '../WordMother';

export default class OrderByMother {
  static create(fieldName?: string): OrderBy {
    return new OrderBy(fieldName ?? WordMother.random());
  }
}
