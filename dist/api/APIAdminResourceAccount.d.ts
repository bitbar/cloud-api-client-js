import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { Account, AccountUsage, AccountUsageParams, AccountUsageSummary, AccountUsageSummaryParams } from './models/Account';
import { NoData, NoQueryParams, SimpleCollectionResponse } from './models/HTTP';
import { Role, RoleData, RoleParams } from './models/Role';
import { AccountService } from './models/AccountService';
import { AccountPreferences } from './models/AccountPreference';
export declare class APIAdminResourceAccount extends APIResource<Account, NoQueryParams, NoData> {
    constructor(parent: APIAdminResource, id: number);
    roles(): APIList<Role, RoleParams, RoleData>;
    role(id: number): APIResource<Role, RoleParams, void>;
    accountServices(): APIList<AccountService, import("./models/HTTP").CollectionQueryParams, any>;
    preferences(): APIResource<AccountPreferences, NoQueryParams, Partial<Omit<AccountPreferences, "id">>>;
    usage(): APIList<SimpleCollectionResponse<AccountUsage>, AccountUsageParams, any>;
    usageSummary(): APIResource<AccountUsageSummary, AccountUsageSummaryParams, AccountUsageSummaryParams>;
}
export default APIAdminResourceAccount;
