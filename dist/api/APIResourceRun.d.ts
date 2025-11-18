import { APIResourceDeviceSession } from './APIResourceDeviceSession';
import { APIResourceRunCommon } from './APIResourceRunCommon';
import { CollectionQueryParams } from './models/HTTP';
export declare class APIResourceRun extends APIResourceRunCommon {
    deviceSession(id: number): APIResourceDeviceSession<CollectionQueryParams>;
}
export default APIResourceRun;
