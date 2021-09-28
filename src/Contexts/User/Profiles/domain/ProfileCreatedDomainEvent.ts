import { DomainEvent } from '../../../Shared/domain/Bus/Event/DomainEvent';

type CreateProfileDomainEventBody = {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly location: string;
  readonly gender: string;
  readonly eventName: string;
};

export default class ProfileCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'profile.created';

  readonly name: string;
  readonly age: number;
  readonly location: string;
  readonly gender: string;

  constructor({
    id,
    name,
    age,
    location,
    gender,
    eventId,
    occurredOn
  }: {
    id: string;
    name: string;
    age: number;
    location: string;
    gender: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super(ProfileCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.name = name;
    this.age = age;
    this.location = location;
    this.gender = gender;
  }

  toPrimitive(): CreateProfileDomainEventBody {
    const { aggregateId, name, age, location, gender } = this;
    return {
      id: aggregateId,
      name,
      age,
      location,
      gender,
      eventName: ProfileCreatedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateProfileDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new ProfileCreatedDomainEvent({
      id: aggregateId,
      name: body.name,
      age: body.age,
      location: body.location,
      gender: body.gender,
      eventId,
      occurredOn
    });
  }
}
