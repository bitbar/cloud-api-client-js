import APIAdminResourceUser from "./APIAdminResourceUser";
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {NonRequestable} from "./decorators/NonRequestable";
import {AccountService} from "./models/AccountService";
import {Role} from "./models/Role";
import {User} from "./models/User";

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
    return new APIList<Role>(this).push('roles');
  }

  // /account/roles/{id}
  role(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<Role>(this).push('roles', id);
  }

  // /account-services
  services() {
    const a = new APIList<AccountService>(this);
    a.last += '-services';
    return a;
  }

  // /update-account
  update() {
    const a = new APIResource<User>(this);
    a.last = 'update-account';
    return a.post();
  }

}

export default APIAdminResourceUserAccount
