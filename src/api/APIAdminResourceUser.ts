import APIResource from './APIResource'
import APIList from './APIList'

import APIAdminResourceUserAccount from './APIAdminResourceUserAccount';


/**
 * APIAdminResourceUser
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceUser extends APIResource {

  /**
   * /users/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'users', id);
  }

  // /users/{id}/disable
  public disable () {
    return new APIResource(this).push('disable');
  }

  // /users/{id}/enable
  public enable () {
    return new APIResource(this).push('enable');
  }

  // /users/{id}/licenses
  public licenses () {
    return new APIList(this).push('licenses');
  }

  // /users/{id}/resend-activation
  public resendActivation () {
    return new APIResource(this).push('resend-activation').post();
  }

  // users/{id}/account
  public account () {
    return new APIAdminResourceUserAccount(this);
  }

}

export default APIAdminResourceUser
