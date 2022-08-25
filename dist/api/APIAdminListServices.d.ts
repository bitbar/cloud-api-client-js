import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { AdminServicesParams, Service } from './models/Service';
export declare class APIAdminListServices extends APIList<Service, AdminServicesParams, Service> {
    constructor(parent: APIAdminResource);
    active(): APIList<Service, AdminServicesParams, Service>;
    activated(): APIList<Service, AdminServicesParams, Service>;
    inUse(): APIList<Service, AdminServicesParams, Service>;
    byPrice(): APIList<Service, AdminServicesParams, Service>;
}
export default APIAdminListServices;
