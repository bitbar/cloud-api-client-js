import APIList from './APIList'
import APIResource from './APIResource'


/**
 * APIListDevices
 *
 * @class
 * @extends APIList
 */
class APIListUsers extends APIList {

  /**
   * /users
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('users');
  }

  // /users/activate
  public activate () {
    return new APIResource(this).push('activate');
  }

  // /users/recoveries
  public recoveries () {
    return new APIResource(this).push('recoveries');
  }

  // /users/passwordRecovery
  public passwordRecovery () {
    return new APIResource(this).push('password-recovery');
  }

  // /users/resetApiKey
  public resetApiKey () {
    return new APIResource(this).push('reset-api-key');
  }

  // /users/resetApiKey
  public validateVatId () {
    return new APIResource(this).push('validateVatId');
  }

}

export default APIListUsers;
