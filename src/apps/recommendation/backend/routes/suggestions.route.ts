import { Router } from 'express';
import SuggestionsGetController from '../controllers/SuggestionsGetController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const suggestionsGetController: SuggestionsGetController = container.get(
    'Apps.Recommendation.Backend.controllers.SuggestionsGetController'
  );
  router.get('/suggestions', suggestionsGetController.invoke.bind(suggestionsGetController));
};
