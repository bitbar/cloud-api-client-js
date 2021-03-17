import APIResource from './APIResource';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
import DeviceSession from './interface/DeviceSession';
declare class APIResourceDeviceSession extends APIResourceDeviceSessionCommon implements DeviceSession {
    abort(): APIResource;
    retry(): APIResource;
}
export default APIResourceDeviceSession;
