import DomainEvent from '../../../domain/Bus/Event/DomainEvent';
import DomainEventMapping from './DomainEventMapping';

export default class DomainEventJsonDeserializer {
  private mapping: DomainEventMapping;

  constructor(mapping: DomainEventMapping) {
    this.mapping = mapping;
  }

  deserialize(event: string): undefined | DomainEvent {
    const eventData = JSON.parse(event).data;
    const eventName = eventData.type;
    const eventClass = this.mapping.forEventName(eventName);

    if (!eventClass) {
      return;
    }

    return eventClass.fromPrimitives(
      eventData.attributes.id,
      eventData.attributes,
      eventData.id,
      eventData.occurred_on
    );
  }
}
