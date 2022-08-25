import { APIResourceDeviceSession } from './APIResourceDeviceSession';
import { APIResourceRunCommon } from './APIResourceRunCommon';
export declare class APIResourceRun extends APIResourceRunCommon {
    deviceSession(id: number): APIResourceDeviceSession;
}
export default APIResourceRun;
