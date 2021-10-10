import DomainEvent from '../../../../../src/Contexts/Shared/domain/Bus/Event/DomainEvent';
import DomainEventSubscriber from '../../../../../src/Contexts/Shared/domain/Bus/Event/DomainEventSubscriber';
import EventBus from '../../../../../src/Contexts/Shared/domain/Bus/Event/EventBus';
import DomainEventMapping from '../../../../../src/Contexts/Shared/infrastructure/Bus/Event/DomainEventMapping';

export default class EventBusMock implements EventBus {
  private publishSpy = jest.fn();

  async publish(events: Array<DomainEvent>): Promise<void> {
    this.publishSpy(events);
  }

  async start(): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDomainEventMapping(domainEventMapping: DomainEventMapping) {}
}
