import APIResource from './APIResource';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
declare class APIAdminResourceDeviceSession extends APIResourceDeviceSessionCommon {
    changeBillable(billable: boolean): APIResource;
}
export default APIAdminResourceDeviceSession;
