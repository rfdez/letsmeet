import { DomainEvent, DomainEventClass } from '../../../domain/Bus/Event/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/Bus/Event/DomainEventSubscriber';

type Mapping = Map<string, DomainEventClass>;

export default class DomainEventMapping {
  private mapping: Mapping;

  constructor(mapping: DomainEventSubscriber<DomainEvent>[]) {
    this.mapping = mapping.reduce(this.eventsExtractor(), new Map<string, DomainEventClass>());
  }

  private eventsExtractor() {
    return (map: Mapping, subscriber: DomainEventSubscriber<DomainEvent>) => {
      subscriber.subscribedTo().forEach(this.eventNameExtractor(map));
      return map;
    };
  }

  private eventNameExtractor(map: Mapping): (domainEvent: DomainEventClass) => void {
    return domainEvent => {
      const eventName = domainEvent.EVENT_NAME;
      map.set(eventName, domainEvent);
    };
  }

  forEventName(name: string) {
    const domainEvent = this.mapping.get(name);

    return domainEvent || undefined;
  }
}
