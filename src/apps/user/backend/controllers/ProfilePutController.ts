import { Controller } from './Controller';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export default class ProfilePutController implements Controller {
  async invoke(req: Request, res: Response) {
    // const id: string = req.params.id;
    // const name: string = req.body.name;

    // try {
    //
    // } catch (error) {
    //   res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }

    res.status(httpStatus.CREATED);
    res.send();
  }
}
