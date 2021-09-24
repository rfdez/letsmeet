import { Command } from '../../../../../../src/Contexts/Shared/domain/Bus/Command/Command';
import { CommandHandler } from '../../../../../../src/Contexts/Shared/domain/Bus/Command/CommandHandler';
import CommandHandlersInformation from '../../../../../../src/Contexts/Shared/infrastructure/Bus/Command/CommandHandlersInformation';
import InMemoryCommandBus from '../../../../../../src/Contexts/Shared/infrastructure/Bus/Command/InMemoryCommandBus';
import CommandNotRegisteredError from '../../../../../../src/Contexts/Shared/domain/Bus/Command/CommandNotRegisteredError';

class UnhandledCommand extends Command {
  static readonly COMMAND_NAME = 'unhandled.command';
}

class HandledCommand extends Command {
  static readonly COMMAND_NAME = 'handled.command';
}

class MyCommandHandled implements CommandHandler<HandledCommand> {
  subscribedTo(): HandledCommand {
    return HandledCommand;
  }

  async handle(command: HandledCommand): Promise<void> {}
}

describe('InMemoryCommandBus', () => {
  it('throws an error if dispaches a command without handler', async () => {
    const unhandledCommand = new UnhandledCommand();
    const commandHandlersInformation = new CommandHandlersInformation([]);
    const commandBus = new InMemoryCommandBus(commandHandlersInformation);

    let exception: any = null;

    try {
      await commandBus.dispatch(unhandledCommand);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(CommandNotRegisteredError);
    expect(exception.message).toBe(`The command <UnhandledCommand> hasn't a command handler associated`);
  });

  it('accepts a command with handler', async () => {
    const handledCommand = new HandledCommand();
    const myCommandHandler = new MyCommandHandled();
    const commandHandlersInformation = new CommandHandlersInformation([myCommandHandler]);
    const commandBus = new InMemoryCommandBus(commandHandlersInformation);

    await commandBus.dispatch(handledCommand);
  });
});
