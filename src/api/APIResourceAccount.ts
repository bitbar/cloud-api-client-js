import {API} from '../API';
import {NoData} from './APIEntity';
import {NoQueryParams, SimpleListCollectionResponse} from './APIList';
import {APIResource} from './APIResource'
import {Account} from './models/Account';
import {AccountConcurrencyStatusMap} from './models/AccountConcurrencyStatusMap';
import {AccountPreferences} from './models/AccountPreference';

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
    return new APIResource<AccountPreferences, NoQueryParams, SimpleListCollectionResponse<AccountPreferences>>(this).push('preferences');
  }

}

export default APIResourceAccount
