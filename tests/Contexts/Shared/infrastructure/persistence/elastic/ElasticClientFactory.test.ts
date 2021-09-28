import { Client as ElasticClient } from '@elastic/elasticsearch';
import ElasticClientFactory from '../../../../../../src/Contexts/Shared/infrastructure/persistence/elastic/ElasticClientFactory';

describe('ElasticClientFactory', () => {
  describe('#createClient', () => {
    const factory = ElasticClientFactory;
    let client: ElasticClient;

    beforeEach(async () => {
      client = await factory.createClient('test', {
        url: 'http://elasticsearch:9200',
        indexName: 'testing',
        indexConfig: {}
      });
    });

    it('should creates a new client with the connection already established', () => {
      expect(client).toBeInstanceOf(ElasticClient);
    });

    it('should creates a new client if it does not exist a client with the given name', async () => {
      const newClient = await factory.createClient('test2', {
        url: 'http://elasticsearch:9200',
        indexName: 'testing',
        indexConfig: {}
      });

      expect(newClient).not.toBe(client);
    });

    it('should returns a client if it already exists', async () => {
      const newClient = await factory.createClient('test', {
        url: 'http://elasticsearch:9200',
        indexName: 'testing',
        indexConfig: {}
      });

      expect(newClient).toBe(client);
    });
  });
});
