import express, { Request, Response } from 'express';
import * as http from 'http';
import Router from 'express-promise-router';
import { registerRoutes } from './routes';
import httpStatus from 'http-status';

export default class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    const router = Router();
    this.express.use(router);

    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log('Server running');
        resolve();
      });
    });
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      return resolve();
    });
  }
}
