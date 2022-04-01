import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'

/**
 * APIResourceAccountService
 *
 * @class
 * @extends APIResource
 */
export class APIResourceAccountService extends APIResource {

  /**
   * /account-services/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('account-services', id);
  }

  // /account-services/{id}/billing-period
  public billingPeriod() {
    return new APIResource(this).push('billing-period');
  }

}

export default APIResourceAccountService
