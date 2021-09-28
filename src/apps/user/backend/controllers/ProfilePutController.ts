import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CommandBus } from '../../../../Contexts/Shared/domain/Bus/Command/CommandBus';
import CreateProfileCommand from '../../../../Contexts/User/Profiles/application/CreateProfileCommand';
import ProfileAlreadyExists from '../../../../Contexts/User/Profiles/domain/ProfileAlreadyExists';
import { Controller } from './Controller';

export default class ProfilePutController implements Controller {
  private commandBus: CommandBus;

  constructor(commandBus: CommandBus) {
    this.commandBus = commandBus;
  }

  async invoke(req: Request, res: Response) {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const age: number = req.body.age;
    const location: string = req.body.location;
    const gender: string = req.body.gender;

    const createProfileCommand = new CreateProfileCommand({ id, name, age, location, gender });

    try {
      await this.commandBus.dispatch(createProfileCommand);
    } catch (error) {
      if (error instanceof ProfileAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST);
        res.send(error.message);
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      res.send(error);
    }

    res.status(httpStatus.CREATED);
    res.send();
  }
}
