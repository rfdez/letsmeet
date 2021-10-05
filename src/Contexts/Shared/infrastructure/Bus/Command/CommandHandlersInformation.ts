import Command from '../../../domain/Bus/Command/Command';
import CommandHandler from '../../../domain/Bus/Command/CommandHandler';
import CommandNotRegisteredError from '../../../domain/Bus/Command/CommandNotRegisteredError';

export default class CommandHandlersInformation {
  private commandHandlersMap: Map<Command, CommandHandler<Command>>;

  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    this.commandHandlersMap = this.formatHandlers(commandHandlers);
  }

  private formatHandlers(commandHandlers: Array<CommandHandler<Command>>): Map<Command, CommandHandler<Command>> {
    const handlersMap = new Map();

    commandHandlers.forEach(commandHandler => {
      const command = commandHandler.subscribedTo();
      handlersMap.set(command, commandHandler);
    });

    return handlersMap;
  }

  search(command: Command): CommandHandler<Command> {
    const commandHandler = this.commandHandlersMap.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler;
  }
}
