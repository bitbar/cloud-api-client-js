import { API } from '../API';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { DesktopBrowserCapabilities } from './models/DesktopBrowserCapabilities';
import { Device, DevicesQueryParams } from './models/Device';
import { DevicePicker } from './models/DeviceFilter';
import { CollectionQueryParams, NoQueryParams } from './models/HTTP';
export declare class APIListDevices extends APIList<Device, DevicesQueryParams> {
    constructor(parent: API);
    filters(): APIResource<DevicePicker, CollectionQueryParams, Pick<DevicePicker, "deviceFilterGroups">>;
    desktopBrowserCapabilities(): APIResource<DesktopBrowserCapabilities, NoQueryParams, void>;
}
export default APIListDevices;
