import Filters from './Filters';
import Order from './Order';

export default class Criteria {
  private static readonly MINIMUM_NUM_FILTERS = 0;
  readonly filters: Filters;
  readonly order: Order;
  readonly limit?: number;
  readonly offset?: number;

  constructor(filters: Filters, order: Order, limit?: number, offset?: number) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }

  hasFilters(): boolean {
    return this.filters.filters.length > Criteria.MINIMUM_NUM_FILTERS;
  }
}
