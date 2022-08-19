import { APIAdminResource } from './APIAdminResource';
import { APIAdminResourceUserAccount } from './APIAdminResourceUserAccount';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceDeviceSessionStandalone } from './APIResourceDeviceSessionStandalone';
import { CollectionQueryParams, NoQueryParams } from './models/HTTP';
import { License } from './models/License';
import { User } from './models/User';
export declare class APIAdminResourceUser extends APIResource<User> {
    constructor(parent: APIAdminResource, id: number);
    disable(): APIResource<User, NoQueryParams, void>;
    enable(): APIResource<User, NoQueryParams, void>;
    licenses(): APIList<License, CollectionQueryParams, void>;
    resendActivation(): APIResource<User, NoQueryParams, void>;
    account(): APIAdminResourceUserAccount;
    deviceSession(id: number): APIResourceDeviceSessionStandalone;
}
export default APIAdminResourceUser;
