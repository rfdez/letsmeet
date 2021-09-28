import { DomainEventClass } from '../../../../Shared/domain/Bus/Event/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/Bus/Event/DomainEventSubscriber';
import ProfileCreatedDomainEvent from '../../../../User/Profiles/domain/ProfileCreatedDomainEvent';
import SuggestionCreator from './SuggestionCreator';

export default class CreateSuggestionOnProfileCreated implements DomainEventSubscriber<ProfileCreatedDomainEvent> {
  private creator: SuggestionCreator;

  constructor(creator: SuggestionCreator) {
    this.creator = creator;
  }

  subscribedTo(): Array<DomainEventClass> {
    return [ProfileCreatedDomainEvent];
  }

  async onEvent(domainEvent: ProfileCreatedDomainEvent): Promise<void> {
    const { aggregateId, age, gender, location } = domainEvent;
    await this.creator.invoke(aggregateId, age, gender, location);
  }
}
