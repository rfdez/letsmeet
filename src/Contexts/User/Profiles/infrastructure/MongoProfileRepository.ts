import { ProfileRepository } from '../domain/ProfileRepository';
import Profile from '../domain/Profile';
import { MongoRepository } from '../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Nullable } from '../../../Shared/domain/Nullable';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';

export default class MongoProfileRepository extends MongoRepository<Profile> implements ProfileRepository {
  public save(profile: Profile): Promise<void> {
    return this.persist(profile.id.value, profile);
  }

  public async search(id: ProfileId): Promise<Nullable<Profile>> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.value });

    // @ts-ignore
    return document ? Profile.fromPrimitives({ ...document, id: id.value }) : null;
  }

  protected moduleName(): string {
    return 'profiles';
  }
}
