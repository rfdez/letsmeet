import DomainEvent, { DomainEventClass } from './DomainEvent';

export default interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;

  onEvent(domainEvent: T): Promise<void>;
}
