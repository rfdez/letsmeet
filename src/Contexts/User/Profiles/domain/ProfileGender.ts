import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

export default class ProfileGender extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
