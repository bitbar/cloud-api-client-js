import APIResourceRunCommon from './APIResourceRunCommon';
import APIAdminResourceDeviceSession from './APIAdminResourceDeviceSession';
declare class APIAdminResourceRun extends APIResourceRunCommon {
    buildLogsZip(ids?: Array<number>): import("./APIResource").default;
    deviceSession(id: number): APIAdminResourceDeviceSession;
}
export default APIAdminResourceRun;
