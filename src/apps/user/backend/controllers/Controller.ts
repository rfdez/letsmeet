import { Request, Response } from 'express';

export interface Controller {
  invoke(req: Request, res: Response): Promise<void>;
}
