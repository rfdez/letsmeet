import SuggestionAge from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionAge';
import IntegerMother from '../../../Shared/domain/IntegerMother';

export default class SuggestionAgeMother {
  private static readonly MIN_AGE = 18;

  static create(value: number): SuggestionAge {
    return new SuggestionAge(value);
  }

  static random(): SuggestionAge {
    return this.create(IntegerMother.random(this.MIN_AGE));
  }
}
