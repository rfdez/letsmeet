import container from '../../../../../../../src/apps/user/backend/dependency-injection';
import { DomainEvent } from '../../../../../../../src/Contexts/Shared/domain/Bus/Event/DomainEvent';
import { DomainEventSubscriber } from '../../../../../../../src/Contexts/Shared/domain/Bus/Event/DomainEventSubscriber';
import Logger from '../../../../../../../src/Contexts/Shared/domain/Logger';
import RabbitMqEventBus
  from '../../../../../../../src/Contexts/Shared/infrastructure/Bus/Event/RabbitMq/RabbitMqEventBus';
import RabbitMqConfigFactory
  from '../../../../../../../src/Contexts/User/Shared/infrastructure/Bus/Event/RabbitMq/RabbitMqConfigFactory';
import UuidMother from '../../../../domain/UuidMother';

// FIXME: RabbitMq Event Bus in skip mode
describe.skip('RabbitMqEventBus', () => {
  let subscriber: DomainEventSubscriberDummy;
  let eventBus: RabbitMqEventBus;

  beforeAll(() => {});

  it('should be called when the event it is subscribed to is published', done => {
    const event = new DummyEvent(UuidMother.random());
    subscriber = new DomainEventSubscriberDummy();
    subscriber.onEvent = async () => {
      done();
    };
    const logger: Logger = container.get('Shared.Logger');
    const config = RabbitMqConfigFactory.createConfig();

    eventBus = new RabbitMqEventBus(config, logger);
    eventBus.publish([event]);
  });
});

class DummyEvent extends DomainEvent {
  static readonly EVENT_NAME = 'dummy:event';

  constructor(id: string) {
    super(DummyEvent.EVENT_NAME, id);
  }

  toPrimitive(): Object {
    throw new Error('Method not implemented.');
  }
}

class DomainEventSubscriberDummy implements DomainEventSubscriber<DummyEvent> {
  subscribedTo(): any[] {
    return [DomainEvent];
  }

  async onEvent(domainEvent: DomainEvent) {
    console.log(domainEvent);
  }
}
