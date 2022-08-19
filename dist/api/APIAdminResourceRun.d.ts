import { APIAdminResourceDeviceSession } from './APIAdminResourceDeviceSession';
import { APIResourceRunCommon } from './APIResourceRunCommon';
import { UserFile } from './models/UserFile';
export declare class APIAdminResourceRun extends APIResourceRunCommon {
    buildLogsZip(ids?: Array<number>): import("./APIResource").APIResource<UserFile, import("./models/UserFile").BuildLogsData, import("./models/UserFile").BuildLogsData>;
    deviceSession(id: number): APIAdminResourceDeviceSession;
}
export default APIAdminResourceRun;
