export default abstract class EnumValueObject<T> {
  readonly value: T;
  readonly validValues: T[];

  protected constructor(value: T, validValues: T[]) {
    this.value = value;
    this.validValues = validValues;
    this.ensureValueIsValid(value);
  }

  ensureValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  protected abstract throwErrorForInvalidValue(value: T): void;
}
