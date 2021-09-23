import { Router } from 'express';
import glob from 'glob';
import path from 'path';

export const registerRoutes = (router: Router) => {
  const routes = glob.sync(path.join(__dirname, '/**/*.route.*'));
  routes.map(route => register(route, router));
};

const register = (routePath: string, router: Router) => {
  const route = require(routePath);
  route.register(router);
};
