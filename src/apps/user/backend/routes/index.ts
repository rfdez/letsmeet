import { Router } from 'express';
import glob from 'glob';
import path from 'path';

export const registerRoutes = (router: Router) => {
  const routeFilePath = path.join(__dirname, '/**/*.route.*');
  const routes = glob.sync(routeFilePath);
  routes.map(route => {
    return register(route, router);
  });
};

const register = (routePath: string, router: Router) => {
  const route = require(routePath);
  route.register(router);
};
