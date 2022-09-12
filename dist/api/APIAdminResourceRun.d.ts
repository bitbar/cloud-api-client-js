import { APIAdminResourceDeviceSession } from './APIAdminResourceDeviceSession';
import { APIResourceRunCommon } from './APIResourceRunCommon';
export declare class APIAdminResourceRun extends APIResourceRunCommon {
    deviceSession(id: number): APIAdminResourceDeviceSession;
}
export default APIAdminResourceRun;
