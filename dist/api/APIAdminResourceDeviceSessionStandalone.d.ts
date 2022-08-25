import { APIResourceDeviceSessionCommon } from './APIResourceDeviceSessionCommon';
import { DeviceSessionCommon } from './interface/DeviceSessionCommon';
export declare class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon implements DeviceSessionCommon {
    changeBillable(billable: boolean): import("./APIResource").APIResource<import("./models/DeviceSession").DeviceSession, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
}
export default APIAdminResourceDeviceSessionStandalone;
