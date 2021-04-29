import APIResource from './APIResource';
import APIList from './APIList';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
import DeviceSessionStandalone from './interface/DeviceSessionStandalone';
import DeviceSessionCommon from './interface/DeviceSessionCommon';
declare class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon implements DeviceSessionCommon, DeviceSessionStandalone {
    changeBillable(billable: boolean): APIResource;
    connections(): APIList;
    connection(id: number): APIResource;
    release(): APIResource;
}
export default APIAdminResourceDeviceSessionStandalone;
