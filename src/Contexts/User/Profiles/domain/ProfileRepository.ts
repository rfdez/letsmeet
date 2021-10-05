import { Nullable } from '../../../Shared/domain/Nullable';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import Profile from './Profile';

export default interface ProfileRepository {
  save(profile: Profile): Promise<void>;

  search(id: ProfileId): Promise<Nullable<Profile>>;
}
