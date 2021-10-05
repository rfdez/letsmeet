import Filter from '../../../../../src/Contexts/Shared/domain/Criteria/Filter';
import Filters from '../../../../../src/Contexts/Shared/domain/Criteria/Filters';

export default class FiltersMother {
  static create(filters: any[]): Filters {
    return new Filters(filters);
  }

  static createOne(filter: Filter): Filters {
    return FiltersMother.create([filter]);
  }

  static blank(): Filters {
    return FiltersMother.create([]);
  }
}
