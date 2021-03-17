import APIResourceRunCommon from './APIResourceRunCommon';
import APIResourceDeviceSession from './APIResourceDeviceSession';
declare class APIResourceRun extends APIResourceRunCommon {
    deviceSession(id: number): APIResourceDeviceSession;
}
export default APIResourceRun;
