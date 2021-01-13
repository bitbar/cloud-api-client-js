import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIAdminResourceUserAccount
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceUserAccount extends APIResource {

  /**
   * /acount
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('account');
  }

  // /account/roles
  public roles () {
    return new APIList(this).push('roles');
  }

  // /account/roles/{id}
  public role (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('roles', id);
  }

  // /account-services
  public services () {
    const a = new APIList(this);
    a.last += '-services';
    return a;
  }

  // /update-account
  public update () {
    const a = new APIResource(this);
    a.last = 'update-account';
    return a.post();
  }

}

export default APIAdminResourceUserAccount
