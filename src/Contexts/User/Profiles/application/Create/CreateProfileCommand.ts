import { Command } from '../../../../Shared/domain/Bus/Command/Command';

type Params = {
  id: string;
  name: string;
  age: number;
  location: string;
  gender: string;
};

export default class CreateProfileCommand extends Command {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly location: string;
  readonly gender: string;

  constructor({ id, name, age, location, gender }: Params) {
    super();
    this.id = id;
    this.name = name;
    this.age = age;
    this.location = location;
    this.gender = gender;
  }
}
