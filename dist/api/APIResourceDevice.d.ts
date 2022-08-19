import { API } from '../API';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { Browser } from './models/Browser';
import { Device, DeviceProperiesData, DeviceProperty } from './models/Device';
import { CollectionBasicQueryParams } from './models/HTTP';
export declare class APIResourceDevice extends APIResource<Device> {
    constructor(parent: API, id: number);
    properties(): APIList<DeviceProperty, CollectionBasicQueryParams, DeviceProperiesData>;
    browsers(): APIList<Browser, import("./models/HTTP").CollectionQueryParams, any>;
}
export default APIResourceDevice;
