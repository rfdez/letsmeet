import { Request, Response } from 'express';

export default interface Controller {
  invoke(req: Request, res: Response): Promise<void>;
}
