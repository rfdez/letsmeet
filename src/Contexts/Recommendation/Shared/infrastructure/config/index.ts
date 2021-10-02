import convict from 'convict';
import path from 'path';

const recommendationConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  elastic: {
    url: {
      doc: 'The Elastic connection URL',
      format: String,
      env: 'ELASTIC_URL',
      default: 'http://elasticsearch:9200'
    },
    indexName: {
      doc: 'The Elastic index name for this context',
      format: String,
      env: 'ELASTIC_INDEX_NAME',
      default: 'recommendation'
    },
    config: {
      doc: 'The Elastic config for this context',
      format: '*',
      env: 'ELASTIC_CONFIG',
      default: {
        settings: {
          index: {
            number_of_replicas: 0 // for local development
          }
        }
      }
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
      default: 'Recommendation-DomainEvents'
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
const envFile = `${recommendationConfig.get('env')}.json`;
const envFilePath = path.join(__dirname, '/', envFile);

recommendationConfig.loadFile([defaultFilePath, envFilePath]);

export default recommendationConfig;
