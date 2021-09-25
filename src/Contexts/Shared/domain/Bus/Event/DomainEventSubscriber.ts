import { DomainEvent, DomainEventClass } from './DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;

  onEvent(domainEvent: T): Promise<void>;
}
