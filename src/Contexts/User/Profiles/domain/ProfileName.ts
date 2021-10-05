import InvalidArgumentError from '../../../Shared/domain/ValueObject/InvalidArgumentError';
import StringValueObject from '../../../Shared/domain/ValueObject/StringValueObject';

export default class ProfileName extends StringValueObject {
  private static readonly MAX_LENGHT = 30;

  constructor(value: string) {
    super(value);

    ProfileName.ensureCorrectLength(value);
  }

  private static ensureCorrectLength(value: string): void {
    if (value.length > ProfileName.MAX_LENGHT) {
      throw new InvalidArgumentError(
        `The Profile Name <${value}> has more than <${ProfileName.MAX_LENGHT}> characters`
      );
    }
  }
}
