import SuggestionId from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionId';
import UuidMother from '../../../Shared/domain/UuidMother';

export default class SuggestionIdMother {
  static create(value: string): SuggestionId {
    return new SuggestionId(value);
  }

  static creator() {
    return () => SuggestionIdMother.random();
  }

  static random(): SuggestionId {
    return this.create(UuidMother.random());
  }
}
