import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Controller from './Controller';

export default class StatusGetController implements Controller {
  async invoke(req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).send();
  }
}
