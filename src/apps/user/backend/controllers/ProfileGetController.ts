import { Request, Response } from 'express';
import httpStatus from 'http-status';
import QueryBus from '../../../../Contexts/Shared/domain/Bus/Query/QueryBus';
import InvalidArgumentError from '../../../../Contexts/Shared/domain/ValueObject/InvalidArgumentError';
import FindProfileQuery from '../../../../Contexts/User/Profiles/application/Find/FindProfileQuery';
import FindProfileResponse from '../../../../Contexts/User/Profiles/application/Find/FindProfileResponse';
import Profile from '../../../../Contexts/User/Profiles/domain/Profile';
import ProfileNotExist from '../../../../Contexts/User/Profiles/domain/ProfileNotExist';
import Controller from './Controller';

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
      res.status(httpStatus.OK).send(ProfileGetController.toResponse(response.profile));
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else if (error instanceof ProfileNotExist) {
        res.status(httpStatus.NOT_FOUND).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus['500_MESSAGE']);
      }
    }
  }

  private static toResponse(profile: Profile) {
    return {
      id: profile.id.toString(),
      name: profile.name.toString(),
      age: profile.age.value,
      location: profile.location.toString(),
      gender: profile.gender.toString()
    };
  }
}
