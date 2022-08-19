import {API} from '../API';
import {APIEntity, NoData} from './APIEntity';
import {APIResource} from './APIResource'
import {AccountService} from './models/AccountService';
import {AccountServicePayment} from './models/AccountServicePayment';
import {BillingPeriodQueryParams} from './models/BillingPeriod';

export class APIResourceAccountService extends APIResource<AccountService> {

  /**
   * /account-services/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('account-services', id);
  }

  // /account-services/{id}/billing-period
  billingPeriod() {
    return new APIResource<AccountServicePayment, BillingPeriodQueryParams, NoData>(this).push('billing-period');
  }

}

export default APIResourceAccountService
