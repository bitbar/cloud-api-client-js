import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { Browser, DeviceBrowserData } from './models/Browser';
import { DeviceModel, DeviceModelData } from './models/DeviceModel';
import { NoQueryParams } from './models/HTTP';
export declare class APIAdminResourceDeviceModel extends APIResource<DeviceModel, NoQueryParams, DeviceModelData> {
    constructor(parent: APIAdminResource, id: number);
    browsers(): APIList<Browser, NoQueryParams, DeviceBrowserData>;
}
export default APIAdminResourceDeviceModel;
