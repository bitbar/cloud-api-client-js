import { APIAdminListDevices } from './APIAdminListDevices';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { CleanupConfigurationData, SpecificCleanupConfigurationQueryParams } from './models/CleanupConfiguration';
import { DeviceCleanupConfiguration } from './models/Device';
import { CollectionQueryParams } from './models/HTTP';
export declare class APIListCleanupConfigurations extends APIList<DeviceCleanupConfiguration, CollectionQueryParams, CleanupConfigurationData> {
    constructor(parent: APIAdminListDevices);
    specific(): APIResource<DeviceCleanupConfiguration, Partial<SpecificCleanupConfigurationQueryParams>, void>;
}
export default APIListCleanupConfigurations;
