import { DeviceSession } from './models/DeviceSession';
import { CollectionBasicQueryParams, NoData } from './models/HTTP';
import APIList from './APIList';
import APIResourceRunCommon from './APIResourceRunCommon';
export declare class APIListTestRunDeviceSessions extends APIList<DeviceSession, CollectionBasicQueryParams, NoData> {
    constructor(parent: APIResourceRunCommon);
}
export default APIListTestRunDeviceSessions;
