import DomainEvent from '../../../../domain/Bus/Event/DomainEvent';
import DomainEventSubscriber from '../../../../domain/Bus/Event/DomainEventSubscriber';
import EventBus from '../../../../domain/Bus/Event/EventBus';
import DomainEventMapping from '../DomainEventMapping';

type Subscription = {
  boundedCallback: Function;
  originalCallback: Function;
};

export default class InMemorySyncEventBus implements EventBus {
  private subscriptions: Map<string, Array<Subscription>>;

  constructor() {
    this.subscriptions = new Map();
  }

  async start(): Promise<void> {}

  async publish(events: Array<DomainEvent>): Promise<void> {
    const executions: any = [];
    events.forEach(event => {
      const subscribers = this.subscriptions.get(event.eventName);
      if (subscribers) {
        subscribers.forEach(subscriber => executions.push(subscriber.boundedCallback(event)));
      }
    });

    await Promise.all(executions);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    subscribers.forEach(subscriber =>
      subscriber.subscribedTo().map(event => this.subscribe(event.EVENT_NAME!, subscriber))
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}

  private subscribe(topic: string, subscriber: DomainEventSubscriber<DomainEvent>): void {
    const currentSubscriptions = this.subscriptions.get(topic);
    const subscription = { boundedCallback: subscriber.onEvent.bind(subscriber), originalCallback: subscriber.onEvent };
    if (currentSubscriptions) {
      currentSubscriptions.push(subscription);
    } else {
      this.subscriptions.set(topic, [subscription]);
    }
  }
}
