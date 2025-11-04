import { Screenshot } from './models/Screenshot';
import { SessionQueryParams, SessionRunStepQueryParams, SessionStepQueryParams } from './models/DeviceSession';
import { NoData } from './models/HTTP';
import APIList from './APIList';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
export declare class APIListScreenshots extends APIList<Screenshot, SessionQueryParams | SessionRunStepQueryParams | SessionStepQueryParams, NoData> {
    constructor(parent: APIResourceDeviceSessionCommon);
}
export default APIListScreenshots;
