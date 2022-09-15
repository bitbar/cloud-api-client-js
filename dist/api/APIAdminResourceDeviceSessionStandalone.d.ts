import { APIResourceDeviceSessionCommon } from './APIResourceDeviceSessionCommon';
import { DeviceSessionCommon } from './interface/DeviceSessionCommon';
export declare class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon implements DeviceSessionCommon {
    changeBillable(billable: boolean): import("./APIResource").APIResource<import("..").DeviceSession, import("..").QueryParams, import("..").QueryParams>;
}
export default APIAdminResourceDeviceSessionStandalone;
