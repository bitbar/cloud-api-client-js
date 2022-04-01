import {API} from "../API";
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'


/**
 * APIAdminResourceUserAccount
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceUserAccount extends APIResource<any> {

  /**
   * /acount
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('account');
  }

  // /account/roles
  public roles() {
    return new APIList(this).push('roles');
  }

  // /account/roles/{id}
  public role(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('roles', id);
  }

  // /account-services
  public services() {
    const a = new APIList(this);
    a.last += '-services';
    return a;
  }

  // /update-account
  public update() {
    const a = new APIResource(this);
    a.last = 'update-account';
    return a.post();
  }

}

export default APIAdminResourceUserAccount
