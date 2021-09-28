import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { QueryBus } from '../../../../Contexts/Shared/domain/Bus/Query/QueryBus';
import FindProfileQuery from '../../../../Contexts/User/Profiles/application/Find/FindProfileQuery';
import FindProfileResponse from '../../../../Contexts/User/Profiles/application/Find/FindProfileResponse';
import Profile from '../../../../Contexts/User/Profiles/domain/Profile';
import ProfileNotExist from '../../../../Contexts/User/Profiles/domain/ProfileNotExist';
import { Controller } from './Controller';

export default class ProfileGetController implements Controller {
  private queryBus: QueryBus;

  constructor(queryBus: QueryBus) {
    this.queryBus = queryBus;
  }

  async invoke(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const query = new FindProfileQuery(id);
    try {
      const response = await this.queryBus.inquire<FindProfileResponse>(query);
      res.status(httpStatus.OK).send(this.toResponse(response.profile));
    } catch (e) {
      if (e instanceof ProfileNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }

  private toResponse(profile: Profile) {
    return {
      id: profile.id.toString(),
      name: profile.name.toString(),
      age: profile.age.value,
      location: profile.location.toString(),
      gender: profile.gender.toString()
    };
  }
}
