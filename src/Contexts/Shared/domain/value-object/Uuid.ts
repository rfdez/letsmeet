import validate from 'uuid-validate';
import { v4 } from 'uuid';
import InvalidArgumentError from './InvalidArgumentError';

export default class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    const randomUuid = v4();
    return new Uuid(randomUuid);
  }

  toString(): string {
    return this.value;
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }
}
