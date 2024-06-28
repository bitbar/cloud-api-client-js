import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {Account} from './models/Account';
import {NoData, NoQueryParams} from './models/HTTP';
import {Role, RoleParams} from './models/Role';


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

  // /admin/accounts/{id}/roles
  roles() {
    return new APIList<Role, RoleParams, NoData>(this).push('roles');
  }

  // /admin/accounts/{id}/roles/{id}
  role(id: number) {
    return new APIResource<Role, RoleParams, NoData>(this).push('roles', id);
  }

}

export default APIAdminResourceAccount
