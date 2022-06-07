import APIAdminResource from "./APIAdminResource";
import {APIResource} from './APIResource'
import {AccountService} from "./models/AccountService";

export class APIAdminResourceAccountService extends APIResource<AccountService> {

  /**
   * /account-services/{id}
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
    return new APIResource<AccountService>(this).push('activate').post();
  }

  // /account-services/{id}/deactivate
  deactivate() {
    return new APIResource<AccountService>(this).push('deactivate').post();
  }

}

export default APIAdminResourceAccountService
