import { Client as ElasticClient } from '@elastic/elasticsearch';
import { ElasticConfig } from '../../../../../../src/Contexts/Shared/infrastructure/persistence/elastic/ElasticConfig';
import EnvironmentArranger from '../EnvironmentArranger';

export default class ElasticEnvironmentArranger extends EnvironmentArranger {
  private readonly elasticClient: Promise<ElasticClient>;
  private config: ElasticConfig;

  constructor(client: Promise<ElasticClient>, config: ElasticConfig) {
    super();
    this.elasticClient = client;
    this.config = config;
  }

  async arrange(): Promise<void> {
    await this.dropIndex(this.config.indexName);
  }

  protected async dropIndex(indexName: string): Promise<void> {
    const client = await this.client();

    await client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          match_all: {}
        }
      },
      refresh: true
    });
  }

  protected client(): Promise<ElasticClient> {
    return this.elasticClient;
  }

  async close(): Promise<void> {}
}
