import { APIAdminResource } from './APIAdminResource';
import { APIResource } from './APIResource';
import { NoData, NoQueryParams } from './models/HTTP';
import { Service, ServiceActivateData } from './models/Service';
export declare class APIAdminResourceService extends APIResource<Service, NoQueryParams, NoData> {
    constructor(parent: APIAdminResource, id: number);
    activate(): APIResource<Service, ServiceActivateData, ServiceActivateData>;
}
export default APIAdminResourceService;
