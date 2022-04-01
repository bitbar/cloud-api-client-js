import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'

/**
 * APIAdminResourceAccountService
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceAccountService extends APIResource {

  /**
   * /account-services/{id}
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'account-services', id);
  }

  // /account-services/{id}/activate
  public activate () {
    return new APIResource(this).push('activate').post();
  }

  // /account-services/{id}/deactivate
  public deactivate () {
    return new APIResource(this).push('deactivate').post();
  }

}

export default APIAdminResourceAccountService
