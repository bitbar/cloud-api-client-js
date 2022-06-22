import {API} from '../API';
import {APIEntity} from './APIEntity';
import {SimpleListCollectionResponse} from './APIList';
import {APIResource} from './APIResource'
import {Account} from './models/Account';
import {AccountConcurrencyStatusMap} from './models/AccountConcurrencyStatusMap';
import {AccountPreferences} from './models/AccountPreference';

export class APIResourceAccount extends APIResource<Account> {

  /**
   * /accounts/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('accounts', id);
  }

  // /accounts/{id}/concurrency-status
  concurrencyStatus() {
    return new APIResource<AccountConcurrencyStatusMap, void, void>(this).push('concurrency-status');
  }

  // /accounts/{id}/preferences
  preferences() {
    return new APIResource<AccountPreferences, void, SimpleListCollectionResponse<AccountPreferences>>(this).push('preferences');
  }

}

export default APIResourceAccount
