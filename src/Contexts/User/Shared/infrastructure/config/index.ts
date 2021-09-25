import convict from 'convict';
import path from 'path';

const userConfig = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The mongo connection URL',
      format: String,
      default: 'mongodb://mongodb:27017/user-backend-dev',
      env: 'MONGO_URL'
    }
  },
  RabbitMq: {
    host: {
      doc: 'The RabbitMq connection host',
      format: String,
      env: 'RABBITMQ_HOST',
      default: 'rabbitmq'
    },
    user: {
      doc: 'The RabbitMq connection user',
      format: String,
      env: 'RABBITMQ_DEFAULT_USER',
      default: 'guest'
    },
    password: {
      doc: 'The RabbitMq connection password',
      format: String,
      env: 'RABBITMQ_DEFAULT_PASS',
      default: 'guest'
    },
    queue: {
      doc: 'Queue where subscribers listen on',
      format: String,
      env: 'RABBITMQ_QUEUE',
      default: 'User-DomainEvents'
    },
    exchange: {
      doc: 'Exchange where events are published',
      format: String,
      env: 'RABBITMQ_EXCHANGE',
      default: 'DomainEvents'
    }
  }
});

const defaultFilePath = path.join(__dirname, '/default.json');
const envFile = `${userConfig.get('env')}.json`;
const envFilePath = path.join(__dirname, '/', envFile);

userConfig.loadFile([defaultFilePath, envFilePath]);

export default userConfig;
