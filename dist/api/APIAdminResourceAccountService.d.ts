import { APIAdminResource } from './APIAdminResource';
import { APIResource } from './APIResource';
import { AccountService } from './models/AccountService';
import { NoData, NoQueryParams } from './models/HTTP';
export declare class APIAdminResourceAccountService extends APIResource<AccountService, NoQueryParams, NoData> {
    constructor(parent: APIAdminResource, id: number);
    activate(): APIResource<AccountService, NoQueryParams, void>;
    deactivate(): APIResource<AccountService, NoQueryParams, void>;
}
export default APIAdminResourceAccountService;
