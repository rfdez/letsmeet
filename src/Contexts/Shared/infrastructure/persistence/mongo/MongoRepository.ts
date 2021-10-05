import { Collection, MongoClient } from 'mongodb';
import AggregateRoot from '../../../domain/Aggregate/AggregateRoot';

export default abstract class MongoRepository<T extends AggregateRoot> {
  private readonly mongoClient: Promise<MongoClient>;

  constructor(mongoClient: Promise<MongoClient>) {
    this.mongoClient = mongoClient;
  }

  protected abstract moduleName(): string;

  protected client(): Promise<MongoClient> {
    return this.mongoClient;
  }

  protected async collection(): Promise<Collection> {
    return (await this.mongoClient).db().collection(this.moduleName());
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();

    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }
}
