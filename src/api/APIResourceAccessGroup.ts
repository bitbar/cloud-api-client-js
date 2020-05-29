import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIResourceAccessGroup
 *
 * @class
 * @extends APIResource
 */
class APIResourceAccessGroup extends APIResource {

  /**
   * /device-groups/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('access-groups', id);
  }

  // /access-groups/{id}/users
  public users () {
    return new APIList(this).push('users');
  }

  // /access-groups/{id}/users/{id}
  public user (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('users', id);
  }

  // /access-groups/{id}/resources
  public resources () {
    return new APIList(this).push('resources');
  }

  // /access-groups/{id}/resources/{id}
  public resource (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('resources', id);
  }

}

export default APIResourceAccessGroup
