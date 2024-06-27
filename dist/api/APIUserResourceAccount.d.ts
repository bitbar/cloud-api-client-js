import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { Account } from './models/Account';
import { NoQueryParams } from './models/HTTP';
import { VisualTestAccess } from './models/VisualTest';
export declare class APIUserResourceAccount extends APIResource<Account> {
    constructor(parent: APIResourceUser);
    visualTestAccess(): APIResource<VisualTestAccess, NoQueryParams, VisualTestAccess>;
}
export default APIUserResourceAccount;
