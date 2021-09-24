import { Command } from '../../../Shared/domain/Bus/Command/Command';
import { CommandHandler } from '../../../Shared/domain/Bus/Command/CommandHandler';
import CreateProfileCommand from './CreateProfileCommand';
import ProfileCreator from './ProfileCreator';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import ProfileName from '../domain/ProfileName';

export default class CreateProfileCommandHandler implements CommandHandler<CreateProfileCommand> {
  constructor(private profileCreator: ProfileCreator) {}

  subscribedTo(): Command {
    return CreateProfileCommand;
  }

  async handle(command: CreateProfileCommand): Promise<void> {
    const profileId = new ProfileId(command.id);
    const profileName = new ProfileName(command.name);
    await this.profileCreator.invoke({ profileId, profileName });
  }
}
