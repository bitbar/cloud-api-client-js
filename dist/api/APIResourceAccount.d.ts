import { API } from '../API';
import { APIResource } from './APIResource';
import { Account } from './models/Account';
import { AccountConcurrencyStatusMap } from './models/AccountConcurrencyStatusMap';
import { AccountPreferences } from './models/AccountPreference';
import { CollectionBasicQueryParams, NoQueryParams, SimpleCollectionResponse } from './models/HTTP';
import { User, UserData } from './models/User';
import { APIList } from './APIList';
export declare class APIResourceAccount extends APIResource<Account> {
    constructor(parent: API, id: number);
    concurrencyStatus(): APIResource<AccountConcurrencyStatusMap, NoQueryParams, void>;
    preferences(): APIResource<AccountPreferences, NoQueryParams, SimpleCollectionResponse<AccountPreferences>>;
    users(): APIList<User, CollectionBasicQueryParams, UserData>;
    removeUser(id: number): APIResource<User, NoQueryParams, void>;
    disableUser(id: number): APIResource<User, NoQueryParams, void>;
    enableUser(id: number): APIResource<User, NoQueryParams, void>;
    resendActivation(id: number): APIResource<User, NoQueryParams, void>;
}
export default APIResourceAccount;
