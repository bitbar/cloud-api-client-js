import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { Browser, DeviceBrowserData } from './models/Browser';
import { DeviceModel, DeviceModelData } from './models/DeviceModel';
import { NoQueryParams } from './models/HTTP';
import { AdminDeviceSession } from './models/AdminDeviceSession';
export declare class APIAdminResourceDeviceModel extends APIResource<DeviceModel, NoQueryParams, DeviceModelData> {
    constructor(parent: APIAdminResource, id: number);
    browsers(): APIList<Browser, NoQueryParams, DeviceBrowserData>;
    queue(): APIList<AdminDeviceSession, import("./models/HTTP").CollectionQueryParams, any>;
}
export default APIAdminResourceDeviceModel;
