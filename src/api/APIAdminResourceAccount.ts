import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'


/**
 * APIAdminResourceAccount
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceAccount extends APIResource {

  /**
   * /admin/accounts/{id}
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'accounts', id);
  }

}

export default APIAdminResourceAccount
