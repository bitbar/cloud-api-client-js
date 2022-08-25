import { APIAdminResource } from './APIAdminResource';
import { APIResource } from './APIResource';
import { Account } from './models/Account';
import { NoData, NoQueryParams } from './models/HTTP';
export declare class APIAdminResourceAccount extends APIResource<Account, NoQueryParams, NoData> {
    constructor(parent: APIAdminResource, id: number);
}
export default APIAdminResourceAccount;
