import {APIAdminResource} from './APIAdminResource';
import {APIResource} from './APIResource'
import {AccountService} from './models/AccountService';
import {NoData, NoQueryParams} from './models/HTTP';

export class APIAdminResourceAccountService extends APIResource<AccountService, NoQueryParams, NoData> {

  /**
   * /admin/account-services/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'account-services', id);
  }

  // /account-services/{id}/activate
  activate() {
    return new APIResource<AccountService, NoQueryParams, NoData>(this).push('activate').post();
  }

  // /account-services/{id}/deactivate
  deactivate() {
    return new APIResource<AccountService, NoQueryParams, NoData>(this).push('deactivate').post();
  }

}

export default APIAdminResourceAccountService
