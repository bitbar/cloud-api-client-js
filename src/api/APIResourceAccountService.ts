import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'
import {AccountService} from './models/AccountService';
import {AccountServicePayment} from './models/AccountServicePayment';
import {QueryParams} from './models/HTTP';

export interface BillingperiodQueryParam extends QueryParams {
  onDate: number;
}
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
    return new APIResource<AccountServicePayment, BillingperiodQueryParam, void>(this).push('billing-period');
  }

}

export default APIResourceAccountService
