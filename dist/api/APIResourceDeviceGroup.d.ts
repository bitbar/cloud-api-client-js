import { API } from '../API';
import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import APIResourceUser from './APIResourceUser';
import { Device, DeviceProperty } from './models/Device';
import { DeviceGroup, DeviceGroupData, DeviceGroupParams, DeviceGroupSelectorData } from './models/DeviceGroup';
import { CollectionBasicQueryParams, NoQueryParams } from './models/HTTP';
import { ShareData, SharedResource } from './models/SharedResource';
export declare class APIResourceDeviceGroup extends APIResource<DeviceGroup> {
    constructor(parent: APIAdminResource | APIResourceUser | API, id: number);
    devices(): APIList<DeviceGroup | Device, DeviceGroupParams, DeviceGroupData>;
    device(id: number): APIResource<void, NoQueryParams, void>;
    selectors(): APIList<DeviceGroup | DeviceProperty, CollectionBasicQueryParams, DeviceGroupSelectorData>;
    selector(id: number): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    share(): APIList<SharedResource, NoQueryParams, ShareData>;
}
export default APIResourceDeviceGroup;
