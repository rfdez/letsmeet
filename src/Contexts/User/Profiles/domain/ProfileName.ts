import InvalidArgumentError from '../../../Shared/domain/value-object/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';

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
