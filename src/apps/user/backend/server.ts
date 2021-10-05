import bodyParser from 'body-parser';
import compress from 'compression';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import http from 'http';
import httpStatus from 'http-status';
import Logger from '../../../Contexts/Shared/domain/Logger';
import container from './dependency-injection';
import registerRoutes from './routes';

export default class Server {
  private express: express.Express;
  private readonly port: string;
  private logger: Logger;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.logger = container.get('Shared.Logger');
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(compress());
    const router = Router();
    this.express.use(router);

    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      this.logger.error(err.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus['500_MESSAGE']);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        const env = this.express.get('env');
        this.logger.info(`  User Backend App is running at http://localhost:${this.port} in ${env} mode`);
        this.logger.info('  Press CTRL-C to stop\n');
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
