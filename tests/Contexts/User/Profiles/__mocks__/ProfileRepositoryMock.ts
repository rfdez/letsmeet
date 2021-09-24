import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import Profile from '../../../../../src/Contexts/User/Profiles/domain/Profile';
import { ProfileRepository } from '../../../../../src/Contexts/User/Profiles/domain/ProfileRepository';
import ProfileId from '../../../../../src/Contexts/User/Shared/domain/Profiles/ProfileId';

export default class ProfileRepositoryMock implements ProfileRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();

  async save(profile: Profile): Promise<void> {
    this.mockSave(profile);
  }

  async search(id: ProfileId): Promise<Nullable<Profile>> {
    return this.mockSearch(id);
  }

  assertLastSavedProfileIs(expected: Profile): void {
    const mock = this.mockSave.mock;
    const lastSavedProfile = mock.calls[mock.calls.length - 1][0] as Profile;
    expect(lastSavedProfile).toBeInstanceOf(Profile);
    expect(lastSavedProfile.toPrimitives()).toEqual(expected.toPrimitives());
  }
}
