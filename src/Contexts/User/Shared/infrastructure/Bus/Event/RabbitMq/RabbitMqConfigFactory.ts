import { RabbitMqConfig } from '../../../../../../Shared/infrastructure/Bus/Event/RabbitMq/RabbitMqConfig';
import config from '../../../config';

export default class RabbitMqConfigFactory {
  static createConfig(): RabbitMqConfig {
    return {
      user: config.get('RabbitMq.user'),
      password: config.get('RabbitMq.password'),
      host: config.get('RabbitMq.host'),
      queue: config.get('RabbitMq.queue'),
      exchange: config.get('RabbitMq.exchange')
    };
  }
}
