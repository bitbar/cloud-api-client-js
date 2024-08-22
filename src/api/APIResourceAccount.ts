import {API} from '../API';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceBillingPeriod} from './APIResourceBillingPeriod';
import {Account, AccountData} from './models/Account';
import {AccountConcurrencyStatusMap} from './models/AccountConcurrencyStatusMap';
import {AccountPreferences} from './models/AccountPreference';
import {AccountService} from './models/AccountService';
import {AccountServicePayment} from './models/AccountServicePayment';
import {BillingPeriod, BillingPeriodQueryParams} from './models/BillingPeriod';
import {DeviceTimeSummaryQueryParams} from './models/Device';
import {CollectionBasicQueryParams, NoData, NoQueryParams, QueryParams, SimpleCollectionResponse} from './models/HTTP';
import {User, UserData} from './models/User';
import {DeviceTimeQueryParams, UserDeviceTime} from './models/UserDeviceTime';
import {UserDeviceTimeSummary} from './models/UserDeviceTimeSummary';
import {VisualTestAccess} from './models/VisualTest';


export class APIResourceAccount extends APIResource<Account, QueryParams, AccountData> {

  /**
   * /accounts/{id}
   */
  constructor(parent: API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('accounts', id);
  }

  // /accounts/{id}/concurrency-status
  concurrencyStatus() {
    return new APIResource<AccountConcurrencyStatusMap, NoQueryParams, NoData>(this).push('concurrency-status');
  }

  // /accounts/{id}/device-time
  deviceTime() {
    return new APIList<UserDeviceTime, DeviceTimeQueryParams, NoData>(this).push('device-time');
  }

  // /accounts/{id}/device-time-summary
  deviceTimeSummary() {
    return new APIList<UserDeviceTimeSummary, DeviceTimeSummaryQueryParams, NoData>(this).push('device-time-summary');
  }

  // /accounts/{id}/preferences
  preferences() {
    return new APIResource<AccountPreferences, NoQueryParams, SimpleCollectionResponse<AccountPreferences>>(this).push('preferences');
  }

  // /accounts/{id}/users
  users() {
    return new APIList<User, CollectionBasicQueryParams, UserData>(this).push('users');
  }

  // /accounts/{accountId}/users/{userId}
  removeUser(id: number) {
    return new APIResource<User, NoQueryParams, NoData>(this).push('users', id);
  }

  // /accounts/{accountId}/users/{userId}/disable
  disableUser(id: number) {
    return new APIResource<User, NoQueryParams, NoData>(this).push('users', id, 'disable').post();
  }

  // /accounts/{accountId}/users/{userId}/enable
  enableUser(id: number) {
    return new APIResource<User, NoQueryParams, NoData>(this).push('users', id, 'enable').post();
  }

  // /accounts/{accountId}/users/{userId}/resend-activation
  resendActivation(id: number) {
    return new APIResource<User, NoQueryParams, NoData>(this).push('users', id, 'resend-activation').post();
  }

  // /accounts/{accountId}/billing-periods
  billingPeriods() {
    return new APIList<BillingPeriod, CollectionBasicQueryParams, NoData>(this).push('billing-periods');
  }

  // /accounts/{accountId}/billing-periods/{id}
  billingPeriod(id: number) {
    return new APIResourceBillingPeriod(this, id);
  }

  // /account-services/{id}/billing-period
  serviceBillingPeriod(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<AccountServicePayment, BillingPeriodQueryParams, NoData>(this).push('account-services', id, 'billing-period');
  }

  // /account/{accountId}/visual-test/access
  visualTestAccess() {
    return new APIResource<VisualTestAccess, NoQueryParams, VisualTestAccess>(this).push('visual-tests', 'access');
  }

  // /account/{accountId}/account-services
  accountServices() {
    return new APIList<AccountService>(this).push('account-services');
  }

}

export default APIResourceAccount;
