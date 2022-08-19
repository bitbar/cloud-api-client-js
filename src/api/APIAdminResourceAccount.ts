import {APIAdminResource} from './APIAdminResource';
import {NoData} from './APIEntity';
import {APIResource} from './APIResource'
import {Account} from './models/Account';
import {NoQueryParams} from './models/HTTP';


export class APIAdminResourceAccount extends APIResource<Account, NoQueryParams, NoData> {

  /**
   * /admin/accounts/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'accounts', id);
  }

}

export default APIAdminResourceAccount
