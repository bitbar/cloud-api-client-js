import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { NoData } from './models/HTTP';
import { DeviceTimeParams, UserDeviceTime } from './models/UserDeviceTime';
export declare class APIAdminResourceDeviceTime extends APIList<UserDeviceTime, DeviceTimeParams, NoData> {
    constructor(parent: APIAdminResource);
}
export default APIAdminResourceDeviceTime;
