import { MongoClient } from 'mongodb';
import MongoClientFactory from '../../../../../../src/Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory';

describe('MongoClientFactory', () => {
  describe('#createClient', () => {
    const factory = MongoClientFactory;
    let client: MongoClient;

    beforeEach(async () => {
      client = await factory.createClient('test', { url: 'mongodb://mongodb:27017/user-backend-test' });
    });

    afterEach(async () => {
      await client.close();
    });

    it('should create a new client with the connection already established', () => {
      expect(client).toBeInstanceOf(MongoClient);
      let connected = false;
      client.connect((error, result) => {
        if (error) {
          connected = false;
        } else if (result instanceof MongoClient) {
          connected = true;
        }
      });
      expect(connected).toBeTruthy();
    });

    it('should create a new client if does not exist a client with the given name', async () => {
      const newClient = await factory.createClient('test2', { url: 'mongodb://mongodb:27017/user-backend-test' });

      expect(newClient).not.toBe(client);

      await newClient.close();
    });

    it('should return a client if it already exists', async () => {
      const newClient = await factory.createClient('test', { url: 'mongodb://mongodb:27017/user-backend-test' });

      expect(newClient).toBe(client);

      await newClient.close();
    });
  });
});
