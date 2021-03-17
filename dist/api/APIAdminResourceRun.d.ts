import APIResource from './APIResource';
import APIResourceRunCommon from './APIResourceRunCommon';
import APIAdminResourceDeviceSession from './APIAdminResourceDeviceSession';
declare class APIAdminResourceRun extends APIResourceRunCommon {
    buildLogsZip(ids?: Array<number>): APIResource;
    deviceSession(id: number): APIAdminResourceDeviceSession;
}
export default APIAdminResourceRun;
