import { Request, Response, Router } from 'express';
import StatusGetController from '../controllers/StatusGetController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const controller: StatusGetController = container.get('Apps.User.Backend.controllers.StatusGetController');
  router.get('/status', (req: Request, res: Response) => {
    return controller.invoke(req, res);
  });
};
