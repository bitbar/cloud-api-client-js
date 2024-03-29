import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceAdditionalUser} from './APIResourceAdditionalUser';
import {APIResourceUser} from './APIResourceUser';
import {Account} from './models/Account';
import {AccountServicePayment} from './models/AccountServicePayment';
import {BillingPeriodQueryParams} from './models/BillingPeriod';
import {CollectionBasicQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {User, UserData} from './models/User';
import {VisualTestAccess} from './models/VisualTest';


export class APIUserResourceAccount extends APIResource<Account> {

  /**
   * /account
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('account');
  }

  // /account/additional-users
  additionalUsers() {
    return new APIList<User, CollectionBasicQueryParams, UserData>(this).push('additional-users');
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
