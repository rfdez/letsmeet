import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
import InvalidArgumentError from '../../../Shared/domain/value-object/InvalidArgumentError';

export default class ProfileAge extends NumberValueObject {
  private static readonly MIN_AGE = 18;

  constructor(value: number) {
    super(value);

    ProfileAge.ensureIsLegalAge(value);
  }

  private static ensureIsLegalAge(value: number): void {
    if (value < ProfileAge.MIN_AGE) {
      throw new InvalidArgumentError(`The Profile Aame <${value}> should be bigger than <${ProfileAge.MIN_AGE}>`);
    }
  }
}
