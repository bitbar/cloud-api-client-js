import APIAdminResource from "./APIAdminResource";
import {APIList, CollectionBasicQueryParams} from './APIList'
import {APIResource} from './APIResource'
import APIResourceUser from "./APIResourceUser";
import {AccessGroup} from "./models/AccessGroup";
import {QueryParams} from "./models/HTTP";
import {SharedResource} from "./models/SharedResource";
import {User} from "./models/User";

export interface UserData extends QueryParams {
  email: string;
}

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

    return new APIResource<User, void, void>(this).push('users', id);
  }

  // /access-groups/{id}/resources
  resources() {
    return new APIList<SharedResource, CollectionBasicQueryParams, void>(this).push('resources');
  }

  // /access-groups/{id}/resources/{id}
  resource(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<SharedResource, void, void>(this).push('resources', id);
  }

}

export default APIResourceAccessGroup
