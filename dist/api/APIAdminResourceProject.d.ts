import { APIResource } from './APIResource';
import { APIResourceProject } from './APIResourceProject';
import { NoQueryParams } from './models/HTTP';
export declare class APIAdminResourceProject extends APIResourceProject {
    unarchive(): APIResource<void, NoQueryParams, void>;
}
export default APIAdminResourceProject;
