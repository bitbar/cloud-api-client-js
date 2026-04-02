import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { AdminDevice, AdminDeviceData } from './models/AdminDevice';
import { DeviceCleanupConfiguration, DeviceCleanupConfigurationData, DeviceLabelData, DeviceProperty } from './models/Device';
import { NoQueryParams, QueryParams } from './models/HTTP';
export declare class APIAdminResourceDevice extends APIResource<AdminDevice, NoQueryParams, AdminDeviceData> {
    constructor(parent: APIAdminResource, id: number);
    cleanupConfiguration(): APIResource<DeviceCleanupConfiguration, QueryParams, DeviceCleanupConfigurationData>;
    labels(): APIList<DeviceProperty, NoQueryParams, DeviceLabelData>;
    label(id: number): APIResource<DeviceProperty, NoQueryParams, void>;
}
export default APIAdminResourceDevice;
