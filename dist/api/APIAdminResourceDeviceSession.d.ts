import { APIResourceDeviceSessionCommon } from './APIResourceDeviceSessionCommon';
export declare class APIAdminResourceDeviceSession extends APIResourceDeviceSessionCommon {
    changeBillable(billable: boolean): import("./APIResource").APIResource<import("./models/DeviceSession").DeviceSession, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
}
export default APIAdminResourceDeviceSession;
