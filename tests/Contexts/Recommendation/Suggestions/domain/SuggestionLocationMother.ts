import SuggestionLocation from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionLocation';
import MotherCreator from '../../../Shared/domain/MotherCreator';

export default class SuggestionLocationMother {
  static create(value: string): SuggestionLocation {
    return new SuggestionLocation(value);
  }

  static random(): SuggestionLocation {
    return this.create(MotherCreator.random().address.cityName());
  }
}
