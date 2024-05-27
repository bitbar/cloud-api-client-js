import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';
import {Account} from './models/Account';
import {AccountServicePayment} from './models/AccountServicePayment';
import {BillingPeriodQueryParams} from './models/BillingPeriod';
import {NoData, NoQueryParams} from './models/HTTP';
import {VisualTestAccess} from './models/VisualTest';


export class APIUserResourceAccount extends APIResource<Account> {

  /**
   * /account
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('account');
  }

  // /account-services/{id}/billing-period
  serviceBillingPeriod(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    const a = new APIResource<AccountServicePayment, BillingPeriodQueryParams, NoData>(this);
    a.last += '-services';
    a.push(id, 'billing-period');
    return a;
  }

  // /account/visualtest/access
  visualTestAccess() {
    return new APIResource<VisualTestAccess, NoQueryParams, VisualTestAccess>(this).push('visualtest', 'access');
  }

}

export default APIUserResourceAccount
