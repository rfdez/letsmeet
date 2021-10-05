import Suggestion from '../../../../../src/Contexts/Recommendation/Suggestions/domain/Suggestion';
import SuggestionAge from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionAge';
import SuggestionGender from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionGender';
import SuggestionId from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionId';
import SuggestionLocation from '../../../../../src/Contexts/Recommendation/Suggestions/domain/SuggestionLocation';
import SuggestionAgeMother from './SuggestionAgeMother';
import SuggestionGenderMother from './SuggestionGenderMother';
import SuggestionIdMother from './SuggestionIdMother';
import SuggestionLocationMother from './SuggestionLocationMother';

export default class SuggestionMother {
  static create(
    id: SuggestionId,
    age: SuggestionAge,
    gender: SuggestionGender,
    location: SuggestionLocation
  ): Suggestion {
    return new Suggestion(id, age, gender, location);
  }

  static withLocation(location: string): Suggestion {
    return this.create(
      SuggestionIdMother.random(),
      SuggestionAgeMother.random(),
      SuggestionGenderMother.random(),
      SuggestionLocationMother.create(location)
    );
  }

  static withAge(age: number): Suggestion {
    return this.create(
      SuggestionIdMother.random(),
      SuggestionAgeMother.create(age),
      SuggestionGenderMother.random(),
      SuggestionLocationMother.random()
    );
  }

  static random(): Suggestion {
    return this.create(
      SuggestionIdMother.random(),
      SuggestionAgeMother.random(),
      SuggestionGenderMother.random(),
      SuggestionLocationMother.random()
    );
  }
}
