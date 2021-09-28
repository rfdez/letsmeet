import { AggregateRoot } from '../../../Shared/domain/Aggregate/AggregateRoot';
import SuggestionAge from './SuggestionAge';
import SuggestionGender from './SuggestionGender';
import SuggestionId from './SuggestionId';
import SuggestionLocation from './SuggestionLocation';

export default class Suggestion extends AggregateRoot {
  readonly id: SuggestionId;
  readonly age: SuggestionAge;
  readonly gender: SuggestionGender;
  readonly location: SuggestionLocation;

  constructor(id: SuggestionId, age: SuggestionAge, gender: SuggestionGender, location: SuggestionLocation) {
    super();
    this.id = id;
    this.age = age;
    this.gender = gender;
    this.location = location;
  }

  public static create(
    id: SuggestionId,
    age: SuggestionAge,
    gender: SuggestionGender,
    location: SuggestionLocation
  ): Suggestion {
    return new Suggestion(id, age, gender, location);
  }

  public static fromPrimitives(plainData: { id: string; age: number; gender: string; location: string }): Suggestion {
    return Suggestion.create(
      new SuggestionId(plainData.id),
      new SuggestionAge(plainData.age),
      new SuggestionGender(plainData.gender),
      new SuggestionLocation(plainData.location)
    );
  }

  toPrimitives(): Object {
    return {
      id: this.id.value,
      age: this.age.value,
      gender: this.gender.value,
      location: this.location.value
    };
  }
}
