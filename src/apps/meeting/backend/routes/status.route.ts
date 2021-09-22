import { Request, Response, Router } from 'express';
import StatusGetController from '../controllers/StatusGetController';

export const register = (router: Router) => {
  // TODO: Get controller instances by container (Dependency injection)
  const controller: StatusGetController = new StatusGetController();
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};
