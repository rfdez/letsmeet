import Query from './Query';
import Response from './Response';

export default interface QueryBus {
  inquire<R extends Response>(query: Query): Promise<R>;
}
