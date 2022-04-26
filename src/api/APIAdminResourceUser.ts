import {API} from '../API';
import {APIAdminResourceUserAccount} from './APIAdminResourceUserAccount';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'


/**
 * APIAdminResourceUser
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceUser extends APIResource {

  /**
   * /users/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'users', id);
  }

  // /users/{id}/disable
  disable() {
    return new APIResource(this).push('disable');
  }

  // /users/{id}/enable
  enable() {
    return new APIResource(this).push('enable');
  }

  // /users/{id}/licenses
  licenses() {
    return new APIList(this).push('licenses');
  }

  // /users/{id}/resend-activation
  resendActivation() {
    return new APIResource(this).push('resend-activation').post();
  }

  // users/{id}/account
  account() {
    return new APIAdminResourceUserAccount(this);
  }

}

export default APIAdminResourceUser
