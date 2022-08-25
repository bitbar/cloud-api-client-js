import { APIEntity } from './APIEntity';
import { APIList } from './APIList';
import { APIResourceUser } from './APIResourceUser';
import { NoData } from './models/HTTP';
import { BasicDeviceTime, DeviceTimeQueryParams, UserDeviceTime } from './models/UserDeviceTime';
export declare class APIListDeviceTime extends APIList<UserDeviceTime, DeviceTimeQueryParams, NoData> {
    constructor(parent: APIResourceUser);
    reserved(): APIEntity<BasicDeviceTime, import("./models/HTTP").QueryParams, any>;
    used(): APIEntity<BasicDeviceTime, import("./models/HTTP").QueryParams, any>;
}
export default APIListDeviceTime;
