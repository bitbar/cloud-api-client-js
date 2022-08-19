import { APIAdminResourceUser } from './APIAdminResourceUser';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { AccountService, AccountServiceData } from './models/AccountService';
import { CollectionQueryParams, NoQueryParams } from './models/HTTP';
import { Role, RoleData } from './models/Role';
import { User, UserUpdateAccount } from './models/User';
export declare class APIAdminResourceUserAccount extends APIResource {
    constructor(parent: APIAdminResourceUser);
    roles(): APIList<Role, NoQueryParams, RoleData>;
    role(id: number): APIResource<Role, NoQueryParams, void>;
    services(): APIList<AccountService, CollectionQueryParams, AccountServiceData>;
    update(): APIResource<User, UserUpdateAccount, UserUpdateAccount>;
}
export default APIAdminResourceUserAccount;
