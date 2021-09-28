import Query from '../../../domain/Bus/Query/Query';
import { QueryBus } from '../../../domain/Bus/Query/QueryBus';
import Response from '../../../domain/Bus/Query/Response';
import QueryHandlersInformation from './QueryHandlersInformation';

export default class InMemoryQueryBus implements QueryBus {
  private queryHandlersInformation: QueryHandlersInformation;

  constructor(queryHandlersInformation: QueryHandlersInformation) {
    this.queryHandlersInformation = queryHandlersInformation;
  }

  inquire<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);

    return handler.handle(query) as Promise<R>;
  }
}
