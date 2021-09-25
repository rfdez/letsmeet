import { Given } from '@cucumber/cucumber';
import { Definition } from 'node-dependency-injection';
import container from '../../../../../../src/apps/user/backend/dependency-injection';
import { DomainEvent } from '../../../../../../src/Contexts/Shared/domain/Bus/Event/DomainEvent';
import { DomainEventSubscriber } from '../../../../../../src/Contexts/Shared/domain/Bus/Event/DomainEventSubscriber';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/Bus/Event/EventBus';
import DomainEventJsonDeserializer from '../../../../../../src/Contexts/Shared/infrastructure/Bus/Event/DomainEventJsonDeserializer';
import DomainEventMapping from '../../../../../../src/Contexts/Shared/infrastructure/Bus/Event/DomainEventMapping';

const eventBus = container.get('Shared.EventBus') as EventBus;
const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  if (domainEvent) {
    await eventBus.publish([domainEvent]);
  }
});

function buildDeserializer() {
  const subscribersDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
  const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

  subscribersDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
  const domainEventMapping = new DomainEventMapping(subscribers);

  return new DomainEventJsonDeserializer(domainEventMapping);
}
