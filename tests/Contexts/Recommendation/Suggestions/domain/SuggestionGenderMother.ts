import SuggestionGender from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionGender';
import MotherCreator from '../../../Shared/domain/MotherCreator';

export default class SuggestionGenderMother {
  static create(value: string): SuggestionGender {
    return new SuggestionGender(value);
  }

  static random(): SuggestionGender {
    return this.create(MotherCreator.random().name.gender());
  }
}
