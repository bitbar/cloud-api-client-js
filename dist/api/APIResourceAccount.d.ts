import { API } from '../API';
import { APIResource } from './APIResource';
import { Account } from './models/Account';
import { AccountConcurrencyStatusMap } from './models/AccountConcurrencyStatusMap';
import { AccountPreferences } from './models/AccountPreference';
import { NoQueryParams, SimpleCollectionResponse } from './models/HTTP';
export declare class APIResourceAccount extends APIResource<Account> {
    constructor(parent: API, id: number);
    concurrencyStatus(): APIResource<AccountConcurrencyStatusMap, NoQueryParams, void>;
    preferences(): APIResource<AccountPreferences, NoQueryParams, SimpleCollectionResponse<AccountPreferences>>;
}
export default APIResourceAccount;
