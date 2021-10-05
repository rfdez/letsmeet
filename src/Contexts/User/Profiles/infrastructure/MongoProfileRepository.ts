import { Nullable } from '../../../Shared/domain/Nullable';
import MongoRepository from '../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import Profile from '../domain/Profile';
import ProfileRepository from '../domain/ProfileRepository';

export default class MongoProfileRepository extends MongoRepository<Profile> implements ProfileRepository {
  save(profile: Profile): Promise<void> {
    return this.persist(profile.id.value, profile);
  }

  async search(id: ProfileId): Promise<Nullable<Profile>> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.value });

    // @ts-ignore
    return document ? Profile.fromPrimitives({ ...document, id: id.value }) : null;
  }

  protected moduleName(): string {
    return 'profiles';
  }
}
