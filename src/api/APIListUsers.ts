import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIListDevices
 *
 * @class
 * @extends APIList
 */
export class APIListUsers extends APIList {

  /**
   * /users
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('users');
  }

  // /users/activate
  activate() {
    return new APIResource(this).push('activate').post();
  }

  // /users/recoveries
  recoveries() {
    return new APIResource(this).push('recoveries');
  }

  // /users/passwordRecovery
  passwordRecovery() {
    return new APIResource(this).push('password-recovery');
  }

  // /users/resetApiKey
  resetApiKey() {
    return new APIResource(this).push('reset-api-key');
  }

  // /users/resetApiKey
  validateVatId() {
    return new APIResource(this).push('validateVatId');
  }

}

export default APIListUsers;
