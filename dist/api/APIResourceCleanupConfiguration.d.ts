import { API } from '../API';
import { APIEntity } from './APIEntity';
import { APIResource } from './APIResource';
import { CleanupConfigurationSpecificData, DeviceCleanupConfiguration } from './models/Device';
import APIList from './APIList';
export declare class APIResourceCleanupConfiguration extends APIResource<DeviceCleanupConfiguration> {
    constructor(parent: APIEntity<any> | API, id: number);
    devices(): APIList<DeviceCleanupConfiguration, CleanupConfigurationSpecificData, void>;
}
export default APIResourceCleanupConfiguration;
