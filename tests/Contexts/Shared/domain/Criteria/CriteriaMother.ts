import Criteria from '../../../../../src/Contexts/Shared/domain/Criteria/Criteria';
import Filters from '../../../../../src/Contexts/Shared/domain/Criteria/Filters';
import Order from '../../../../../src/Contexts/Shared/domain/Criteria/Order';
import FiltersMother from './FiltersMother';
import OrderMother from './OrderMother';

export default class CriteriaMother {
  static create(filters: Filters, order?: Order, offset?: number, limit?: number): Criteria {
    return new Criteria(filters, order ?? OrderMother.none(), offset, limit);
  }

  static empty(): Criteria {
    return CriteriaMother.create(FiltersMother.blank(), OrderMother.none());
  }
}
