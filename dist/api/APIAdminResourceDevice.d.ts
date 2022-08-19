import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { AdminDevice, AdminDeviceData } from './models/AdminDevice';
import { AdminDeviceSession } from './models/AdminDeviceSession';
import { DeviceCleanupConfiguration, DeviceCleanupConfigurationData, DeviceLabelData, DeviceProperty } from './models/Device';
import { NoQueryParams, QueryParams } from './models/HTTP';
export declare class APIAdminResourceDevice extends APIResource<AdminDevice, NoQueryParams, AdminDeviceData> {
    constructor(parent: APIAdminResource, id: number);
    blink(): APIResource<AdminDevice, NoQueryParams, void>;
    cleanupConfiguration(): APIResource<DeviceCleanupConfiguration, QueryParams, DeviceCleanupConfigurationData>;
    labels(): APIList<DeviceProperty, NoQueryParams, DeviceLabelData>;
    label(id: number): APIResource<DeviceProperty, NoQueryParams, void>;
    queue(): APIList<AdminDeviceSession, import("./models/HTTP").CollectionQueryParams, any>;
}
export default APIAdminResourceDevice;
