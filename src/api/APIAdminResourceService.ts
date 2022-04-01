import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'


/**
 * APIAdminResourceService
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceService extends APIResource {

  /**
   * /services/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'services', id);
  }

  // /services/{id}/activate
  public activate() {
    return new APIResource(this).push('activate').post();
  }

  // /services/{id}/deactivate
  public deactivate() {
    return new APIResource(this).push('deactivate').post();
  }

  // /services/{id}/roles
  public roles() {
    return new APIList(this).push('roles');
  }

}

export default APIAdminResourceService
