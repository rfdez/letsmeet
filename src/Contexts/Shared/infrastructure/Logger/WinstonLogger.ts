import winston, {Logger as WinstonLoggerType} from 'winston';
import Logger from '../../domain/Logger';

// eslint-disable-next-line no-unused-vars
enum Levels {
  // eslint-disable-next-line no-unused-vars
  DEBUG = 'debug',
  // eslint-disable-next-line no-unused-vars
  ERROR = 'error',
  // eslint-disable-next-line no-unused-vars
  INFO = 'info'
}

export default class WinstonLogger implements Logger {
  private logger: WinstonLoggerType;

  private readonly prettyPrint = winston.format.prettyPrint();
  private readonly errors = winston.format.errors({ stack: true });
  private readonly splat = winston.format.splat();
  private readonly colorize = winston.format.colorize();
  private readonly simple = winston.format.simple();

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(this.prettyPrint, this.errors, this.splat, this.colorize, this.simple),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
        new winston.transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
        new winston.transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
      ]
    });
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string | Error): void {
    this.logger.error(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }
}
