import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceAdditionalUser} from './APIResourceAdditionalUser';

/**
 * APIUserResourceAccount
 *
 * @class
 * @extends APIResource
 */
export class APIUserResourceAccount extends APIResource {

  /**
   * /account
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('account');
  }

  // /account/additional-users
  additionalUsers() {
    return new APIList(this).push('additional-users');
  }

  // /account/additional-users/{id}
  additionalUser(id: number) {
    return new APIResourceAdditionalUser(this, id);
  }

  // /account-services/{id}/billing-period
  serviceBillingPeriod(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    const a = new APIResource(this);
    a.last += '-services';
    a.push(id, 'billing-period');
    return a;
  }

}

export default APIUserResourceAccount
