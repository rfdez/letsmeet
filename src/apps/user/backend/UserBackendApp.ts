import http from 'http';
import { Definition } from 'node-dependency-injection';
import { DomainEvent } from '../../../Contexts/Shared/domain/Bus/Event/DomainEvent';
import { DomainEventSubscriber } from '../../../Contexts/Shared/domain/Bus/Event/DomainEventSubscriber';
import { EventBus } from '../../../Contexts/Shared/domain/Bus/Event/EventBus';
import DomainEventMapping from '../../../Contexts/Shared/infrastructure/Bus/Event/DomainEventMapping';
import container from './dependency-injection';
import Server from './server';

export default class UserBackendApp {
  server?: Server;

  async start(): Promise<void> {
    const port = process.env.PORT || '3000';
    this.server = new Server(port);
    await this.registerSubscribers();
    return this.server.listen();
  }

  async stop(): Promise<void> {
    return this.server?.stop();
  }

  get httpServer(): http.Server | undefined {
    return this.server?.getHttpServer();
  }

  private async registerSubscribers() {
    const eventBus = container.get('Shared.EventBus') as EventBus;
    const subscribersDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscribersDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
    const domainEventMapping = new DomainEventMapping(subscribers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(subscribers);
    await eventBus.start();
  }
}
