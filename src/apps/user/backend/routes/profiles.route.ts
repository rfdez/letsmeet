import { Request, Response, Router } from 'express';
import container from '../dependency-injection';
import ProfilePutController from '../controllers/ProfilePutController';

export const register = (router: Router) => {
  const profilePutController: ProfilePutController = container.get('Apps.user.controllers.ProfilePutController');
  router.put('/profiles/:id', (req: Request, res: Response) => {
    return profilePutController.invoke(req, res);
  });
};
