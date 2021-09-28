import Query from './Query';
import Response from './Response';

export interface QueryBus {
  inquire<R extends Response>(query: Query): Promise<R>;
}
