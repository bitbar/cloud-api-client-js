import {API} from '../API';
import {APIResource} from './APIResource'
import {Account} from './models/Account';
import {AccountConcurrencyStatusMap} from './models/AccountConcurrencyStatusMap';
import {AccountPreferences} from './models/AccountPreference';
import {CollectionBasicQueryParams, NoData, NoQueryParams, SimpleCollectionResponse} from './models/HTTP';
import {User, UserData} from './models/User';
import {APIList} from './APIList';


export class APIResourceAccount extends APIResource<Account> {

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

}

export default APIResourceAccount
