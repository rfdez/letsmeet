import { Command } from '../../../Shared/domain/Bus/Command/Command';
import { CommandHandler } from '../../../Shared/domain/Bus/Command/CommandHandler';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import ProfileAge from '../domain/ProfileAge';
import ProfileGender from '../domain/ProfileGender';
import ProfileLocation from '../domain/ProfileLocation';
import ProfileName from '../domain/ProfileName';
import CreateProfileCommand from './CreateProfileCommand';
import ProfileCreator from './ProfileCreator';

export default class CreateProfileCommandHandler implements CommandHandler<CreateProfileCommand> {
  private profileCreator: ProfileCreator;

  constructor(profileCreator: ProfileCreator) {
    this.profileCreator = profileCreator;
  }

  subscribedTo(): Command {
    return CreateProfileCommand;
  }

  async handle(command: CreateProfileCommand): Promise<void> {
    const profileId = new ProfileId(command.id);
    const profileName = new ProfileName(command.name);
    const profileAge = new ProfileAge(command.age);
    const profileLocation = new ProfileLocation(command.location);
    const profileGender = new ProfileGender(command.gender);
    await this.profileCreator.invoke({
      profileId,
      profileName,
      profileAge,
      profileLocation,
      profileGender
    });
  }
}
