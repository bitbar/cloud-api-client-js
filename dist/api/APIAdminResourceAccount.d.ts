import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { Account } from './models/Account';
import { NoData, NoQueryParams } from './models/HTTP';
import { Role, RoleParams } from './models/Role';
export declare class APIAdminResourceAccount extends APIResource<Account, NoQueryParams, NoData> {
    constructor(parent: APIAdminResource, id: number);
    roles(): APIList<Role, RoleParams, void>;
    role(id: number): APIResource<Role, RoleParams, void>;
}
export default APIAdminResourceAccount;
