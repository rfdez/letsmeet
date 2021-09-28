import Query from '../../../../Shared/domain/Bus/Query/Query';
import QueryHandler from '../../../../Shared/domain/Bus/Query/QueryHandler';
import ProfileId from '../../../Shared/domain/Profiles/ProfileId';
import FindProfileQuery from './FindProfileQuery';
import FindProfileResponse from './FindProfileResponse';
import ProfileFinder from './ProfileFinder';

export default class FindProfileQueryHandler implements QueryHandler<FindProfileQuery, FindProfileResponse> {
  private finder: ProfileFinder;

  constructor(finder: ProfileFinder) {
    this.finder = finder;
  }

  subscribedTo(): Query {
    return FindProfileQuery;
  }

  handle(query: FindProfileQuery): Promise<FindProfileResponse> {
    const profileId = new ProfileId(query.id);
    return this.finder.invoke({ profileId });
  }
}
