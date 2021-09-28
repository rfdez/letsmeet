import Query from '../../../../Shared/domain/Bus/Query/Query';

export default class FindProfileQuery extends Query {
  readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}
