import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import APIResourceUser from "./APIResourceUser";
import {AccessGroup} from "./models/AccessGroup";

/**
 * APIResourceAccessGroup
 *
 * @class
 * @extends APIResource
 */
export class APIResourceAccessGroup extends APIResource<AccessGroup> {

  /**
   * /device-groups/{id}
   *
   * Constructor
   */
  constructor(parent: APIAdminResource|APIResourceUser, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('access-groups', id);
  }

  // /access-groups/{id}/users
  users() {
    return new APIList(this).push('users');
  }

  // /access-groups/{id}/users/{id}
  user(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('users', id);
  }

  // /access-groups/{id}/resources
  resources() {
    return new APIList(this).push('resources');
  }

  // /access-groups/{id}/resources/{id}
  resource(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('resources', id);
  }

}

export default APIResourceAccessGroup
