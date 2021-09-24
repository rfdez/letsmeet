import Profile from './Profile';
import ProfileId from '../../Shared/domain/Profiles/ProfileId';
import { Nullable } from '../../../Shared/domain/Nullable';

export interface ProfileRepository {
  save(profile: Profile): Promise<void>;

  search(id: ProfileId): Promise<Nullable<Profile>>;
}
