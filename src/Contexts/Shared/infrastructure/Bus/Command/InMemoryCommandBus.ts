import { CommandBus } from '../../../domain/Bus/Command/CommandBus';
import CommandHandlersInformation from './CommandHandlersInformation';
import { Command } from '../../../domain/Bus/Command/Command';

export default class InMemoryCommandBus implements CommandBus {
  private commandHandlersInformation: CommandHandlersInformation;

  constructor(commandHandlersInformation: CommandHandlersInformation) {
    this.commandHandlersInformation = commandHandlersInformation;
  }

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command);

    await handler.handle(command);
  }
}
