import {APIAdminResource} from "./APIAdminResource";
import {NoData} from "./APIEntity";
import {APIList, CollectionBasicQueryParams, NoQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceUser} from "./APIResourceUser";
import {AccessGroup} from "./models/AccessGroup";
import {SharedResource} from "./models/SharedResource";
import {User, UserData} from "./models/User";

export class APIResourceAccessGroup extends APIResource<AccessGroup> {

  /**
   * /access-groups/{id}
   *
   */
  constructor(parent: APIAdminResource | APIResourceUser, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('access-groups', id);
  }

  // /access-groups/{id}/users
  users() {
    return new APIList<User, CollectionBasicQueryParams, UserData>(this).push('users');
  }

  // /access-groups/{id}/users/{id}
  user(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<User, NoQueryParams, NoData>(this).push('users', id);
  }

  // /access-groups/{id}/resources
  resources() {
    return new APIList<SharedResource, CollectionBasicQueryParams, NoData>(this).push('resources');
  }

  // /access-groups/{id}/resources/{id}
  resource(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<SharedResource, NoQueryParams, NoData>(this).push('resources', id);
  }

}

export default APIResourceAccessGroup
