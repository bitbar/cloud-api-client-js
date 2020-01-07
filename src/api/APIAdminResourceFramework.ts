import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIAdminResourceFramework
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceFramework extends APIResource {

  /**
   * /frameworks/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('frameworks', id);
  }

  // /frameworks/{id}/config
  public config () {
    return new APIResource(this).push('config');
  }

  // /frameworks/{id}/required-roles
  public requiredRoles () {
    return new APIList(this).push('required-roles');
  }

}

export default APIAdminResourceFramework
