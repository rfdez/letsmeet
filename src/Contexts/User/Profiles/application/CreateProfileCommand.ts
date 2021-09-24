import { Command } from '../../../Shared/domain/Bus/Command/Command';

type Params = {
  id: string;
  name: string;
};

export default class CreateProfileCommand extends Command {
  readonly id: string;
  readonly name: string;

  constructor({ id, name }: Params) {
    super();
    this.id = id;
    this.name = name;
  }
}
