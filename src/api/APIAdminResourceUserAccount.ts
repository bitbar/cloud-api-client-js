import {APIAdminResourceUser} from './APIAdminResourceUser';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {NonRequestable} from './decorators/NonRequestable';
import {AccountService, AccountServiceData} from './models/AccountService';
import {CollectionQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {Role, RoleData} from './models/Role';
import {User, UserUpdateAccount} from './models/User';

@NonRequestable
export class APIAdminResourceUserAccount extends APIResource {

  /**
   * /account
   */
  constructor(parent: APIAdminResourceUser) {
    super(parent);
    this.push('account');
  }

  // /account/roles
  roles() {
    return new APIList<Role, NoQueryParams, RoleData>(this).push('roles');
  }

  // /account/roles/{id}
  role(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<Role, NoQueryParams, NoData>(this).push('roles', id);
  }

  // /account-services
  services() {
    const a = new APIList<AccountService, CollectionQueryParams, AccountServiceData>(this);
    a.last += '-services';
    return a;
  }

  // /update-account
  update() {
    const a = new APIResource<User, UserUpdateAccount>(this);
    a.last = 'update-account';
    return a.post();
  }

}

export default APIAdminResourceUserAccount
