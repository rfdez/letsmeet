import { Request, Response, Router } from 'express';
import ProfileGetController from '../controllers/ProfileGetController';
import ProfilePutController from '../controllers/ProfilePutController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const profilePutController: ProfilePutController = container.get(
    'Apps.User.Backend.controllers.ProfilePutController'
  );
  router.put('/profiles/:id', (req: Request, res: Response) => profilePutController.invoke(req, res));

  const profileGetController: ProfileGetController = container.get(
    'Apps.User.Backend.controllers.ProfileGetController'
  );
  router.get('/profiles/:id', (req: Request, res: Response) => profileGetController.invoke(req, res));
};
