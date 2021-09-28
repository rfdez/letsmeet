import Query from '../../../../../../src/Contexts/Shared/domain/Bus/Query/Query';
import QueryHandler from '../../../../../../src/Contexts/Shared/domain/Bus/Query/QueryHandler';
import QueryNotRegisteredError from '../../../../../../src/Contexts/Shared/domain/Bus/Query/QueryNotRegisteredError';
import Response from '../../../../../../src/Contexts/Shared/domain/Bus/Query/Response';
import InMemoryQueryBus from '../../../../../../src/Contexts/Shared/infrastructure/Bus/Query/InMemoryQueryBus';
import QueryHandlersInformation from '../../../../../../src/Contexts/Shared/infrastructure/Bus/Query/QueryHandlersInformation';

class UnhandledQuery extends Query {
  static readonly QUERY_NAME = 'unhandled.query';
}

class HandledQuery extends Query {
  static readonly QUERY_NAME = 'handled.query';
}

class MyQueryHandler implements QueryHandler<Query, Response> {
  subscribedTo(): HandledQuery {
    return HandledQuery;
  }

  async handle(query: HandledQuery): Promise<Response> {
    console.log(query.constructor.name);
    return {};
  }
}

describe('InMemoryQueryBus', () => {
  it('should throws an error if inquires a query without handler', async () => {
    const unhandledQuery = new UnhandledQuery();
    const queryHandlersInformation = new QueryHandlersInformation([]);
    const queryBus = new InMemoryQueryBus(queryHandlersInformation);

    let exception = null;

    try {
      await queryBus.inquire(unhandledQuery);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(QueryNotRegisteredError);

    exception = exception as QueryNotRegisteredError;
    expect(exception.message).toBe(`The query <UnhandledQuery> hasn't a query handler associated`);
  });

  it('should accepts a query with handler', async () => {
    const handledQuery = new HandledQuery();
    const myQueryHandler = new MyQueryHandler();
    const queryHandlersInformation = new QueryHandlersInformation([myQueryHandler]);
    const queryBus = new InMemoryQueryBus(queryHandlersInformation);

    await queryBus.inquire(handledQuery);
  });
});
