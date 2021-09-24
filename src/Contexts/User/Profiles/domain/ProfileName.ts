import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import InvalidArgumentError from '../../../Shared/domain/value-object/InvalidArgumentError';

export default class ProfileName extends StringValueObject {
  private readonly maxLength = 30;

  constructor(value: string) {
    super(value);

    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > this.maxLength) {
      throw new InvalidArgumentError(`The Course Name <${value}> has more than <${this.maxLength}> characters`);
    }
  }
}
