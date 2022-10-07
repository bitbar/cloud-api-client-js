import {API} from '../API';
import {APIResource} from './APIResource'
import {Account} from './models/Account';
import {AccountConcurrencyStatusMap} from './models/AccountConcurrencyStatusMap';
import {AccountPreferences} from './models/AccountPreference';
import {NoData, NoQueryParams, SimpleCollectionResponse} from './models/HTTP';
import {VisualTestAccess} from './models/VisualTesting';

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

  // /accounts/{id}/visual-tests-access
  visualTestsAccess() {
    return new APIResource<VisualTestAccess, NoQueryParams, SimpleCollectionResponse<VisualTestAccess>>(this).push('visual-tests-access');
  }

}

export default APIResourceAccount
