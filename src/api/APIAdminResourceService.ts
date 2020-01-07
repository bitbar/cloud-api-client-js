import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIAdminResourceService
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceService extends APIResource {

  /**
   * /services/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('services', id);
  }

  // /services/{id}/activate
  public activate () {
    return new APIResource(this).push('activate');
  }

  // /services/{id}/deactivate
  public deactivate () {
    return new APIResource(this).push('deactivate');
  }

  // /services/{id}/roles
  public roles () {
    return new APIList(this).push('roles');
  }

}

export default APIAdminResourceService
