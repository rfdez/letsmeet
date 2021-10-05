import Uuid from '../../ValueObject/Uuid';

export default abstract class DomainEvent {
  static readonly EVENT_NAME: string;
  static fromPrimitives: (...args: any[]) => any;
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  protected constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.eventId = eventId || Uuid.random().value;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  abstract toPrimitive(): Object;
}

export type DomainEventClass = { EVENT_NAME: string; fromPrimitives(...args: any[]): DomainEvent };
