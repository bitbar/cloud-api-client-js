import APIResource from './APIResource'
import APIResourceAdditionalUser from './APIResourceAdditionalUser';

import APIList from './APIList'

/**
 * APIResourceAccount
 *
 * @class
 * @extends APIResource
 */
class APIResourceAccount extends APIResource {

  /**
   * /account
   *
   * Constructor
   */
  constructor (parent: object, id?: number) {
    super(parent);
    if(id)
      this.push('accounts', id)
    else
      this.push('account');
  }

  // /accounts/{id}/preferences
  public preferences () {
    return new APIResource(this).push('preferences');
  }

  // /accounts/{id}/concurrency-status
  public concurrencyStatus () {
    return new APIResource(this).push('concurrency-status');
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

  // /account/additional-users
  public additionalUsers () {
    return new APIList(this).push('additional-users');
  }

  // /account/additional-users/{id}
  public additionalUser (id: number) {
    return new APIResourceAdditionalUser(this, id);
  }

}

export default APIResourceAccount
