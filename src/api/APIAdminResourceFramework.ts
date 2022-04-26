import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIAdminResourceFramework
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceFramework extends APIResource {

  /**
   * /frameworks/{id}
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'frameworks', id);
  }

  // /frameworks/{id}/config
  config () {
    return new APIResource(this).push('config');
  }

  // /frameworks/{id}/required-roles
  requiredRoles () {
    return new APIList(this).push('required-roles');
  }

}

export default APIAdminResourceFramework
