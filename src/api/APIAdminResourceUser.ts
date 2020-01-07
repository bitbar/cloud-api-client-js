import APIResource from './APIResource'
import APIList from './APIList'


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
    this.push('users', id);
  }

  // /users/{id}/account/roles
  public accountRoles () {
    return new APIList(this).push('account', 'roles');
  }

  // /users/{id}/account/roles/{id}
  public accountRole () {
    return new APIResource(this).push('account', 'roles', 'id');
  }

  // /users/{id}/account/services
  public accountServices () {
    return new APIList(this).push('account', 'services');
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
    return new APIResource(this).push('resend-activation');
  }

  // /users/{id}/update-account
  public updateAccount () {
    return new APIResource(this).push('update-account');
  }

}

export default APIAdminResourceUser
