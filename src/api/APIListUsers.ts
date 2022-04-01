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
  public activate() {
    return new APIResource(this).push('activate').post();
  }

  // /users/recoveries
  public recoveries() {
    return new APIResource(this).push('recoveries');
  }

  // /users/passwordRecovery
  public passwordRecovery() {
    return new APIResource(this).push('password-recovery');
  }

  // /users/resetApiKey
  public resetApiKey() {
    return new APIResource(this).push('reset-api-key');
  }

  // /users/resetApiKey
  public validateVatId() {
    return new APIResource(this).push('validateVatId');
  }

}

export default APIListUsers;
