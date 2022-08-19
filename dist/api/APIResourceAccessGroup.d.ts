import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { AccessGroup } from './models/AccessGroup';
import { CollectionBasicQueryParams, NoQueryParams } from './models/HTTP';
import { SharedResource } from './models/SharedResource';
import { User, UserData } from './models/User';
export declare class APIResourceAccessGroup extends APIResource<AccessGroup> {
    constructor(parent: APIAdminResource | APIResourceUser, id: number);
    users(): APIList<User, CollectionBasicQueryParams, UserData>;
    user(id: number): APIResource<User, NoQueryParams, void>;
    resources(): APIList<SharedResource, CollectionBasicQueryParams, void>;
    resource(id: number): APIResource<SharedResource, NoQueryParams, void>;
}
export default APIResourceAccessGroup;
