import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList, CollectionBasicQueryParams} from './APIList'
import {UserData} from './APIListUsers';
import {APIResource} from './APIResource'
import {APIResourceAdditionalUser} from './APIResourceAdditionalUser';
import {Account} from './models/Account';
import {AccountServicePayment} from './models/AccountServicePayment';
import {QueryParams} from './models/HTTP';
import {User} from './models/User';

export interface BillingPeriodQueryParams extends QueryParams {
  onDate: number;
}

export class APIUserResourceAccount extends APIResource<Account> {

  /**
   * /account
   */
  constructor(parent: APIEntity<any> | API) {
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

    const a = new APIResource<AccountServicePayment, BillingPeriodQueryParams, void>(this);
    a.last += '-services';
    a.push(id, 'billing-period');
    return a;
  }

}

export default APIUserResourceAccount
