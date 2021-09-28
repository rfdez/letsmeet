import { ElasticConfig } from '../../../../../Shared/infrastructure/persistence/elastic/ElasticConfig';
import config from '../../config';

export default class RecommendationElasticConfigFactory {
  static createConfig(): ElasticConfig {
    return {
      url: config.get('elastic.url'),
      indexName: config.get('elastic.indexName'),
      indexConfig: config.get('elastic.config')
    };
  }
}
