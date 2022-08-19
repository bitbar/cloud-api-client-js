import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { Framework, FrameworkConfigData, FrameworkEditData } from './models/Framework';
import { NoQueryParams } from './models/HTTP';
import { ProjectJobConfig } from './models/ProjectJobConfig';
import { Role } from './models/Role';
export declare class APIAdminResourceFramework extends APIResource<Framework, NoQueryParams, FrameworkEditData> {
    constructor(parent: APIAdminResource, id: number);
    config(): APIResource<ProjectJobConfig, NoQueryParams, FrameworkConfigData>;
    requiredRoles(): APIList<Role, import("./models/HTTP").CollectionQueryParams, any>;
}
export default APIAdminResourceFramework;
