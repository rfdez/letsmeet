import Server from './server';
import * as http from 'http';

export default class MeetingBackendApp {
  server?: Server;

  async start(): Promise<void> {
    const port = process.env.PORT || '3000';
    this.server = new Server(port);
    return this.server.listen();
  }

  async stop(): Promise<void> {
    return this.server?.stop();
  }

  get httpServer(): http.Server | undefined {
    return this.server?.getHttpServer();
  }
}
