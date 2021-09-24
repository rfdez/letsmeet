import { DomainEvent } from '../../../Shared/domain/Bus/Event/DomainEvent';

type CreateProfileDomainEventBody = {
  readonly id: string;
  readonly name: string;
  readonly eventName: string;
};

export default class ProfileCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'profile.created';

  readonly name: string;

  constructor({ id, name, eventId, occurredOn }: { id: string; name: string; eventId?: string; occurredOn?: Date }) {
    super(ProfileCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.name = name;
  }

  toPrimitive(): CreateProfileDomainEventBody {
    const { name, aggregateId } = this;
    return {
      id: aggregateId,
      name,
      eventName: ProfileCreatedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateProfileDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new ProfileCreatedDomainEvent({ id: aggregateId, name: body.name, eventId, occurredOn });
  }
}
