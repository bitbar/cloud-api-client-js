import { API } from '../API';
import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIListCleanupConfigurations } from './APIListCleanupConfigurations';
import { APIResourceCleanupConfiguration } from './APIResourceCleanupConfiguration';
import { AdminDevice, AdminDeviceData, AdminDevicesQueryParams } from './models/AdminDevice';
export declare class APIAdminListDevices extends APIList<AdminDevice, AdminDevicesQueryParams, AdminDeviceData> {
    constructor(parent: APIAdminResource | API);
    cleanupConfigurations(): APIListCleanupConfigurations;
    cleanupConfiguration(id: number): APIResourceCleanupConfiguration;
}
export default APIAdminListDevices;
