import { APIResource } from './APIResource';
import { APIResourceDeviceSessionCommon } from './APIResourceDeviceSessionCommon';
import { DeviceSession } from './interface/DeviceSession';
import { DeviceSession as DeviceSessionModel } from './models/DeviceSession';
export declare class APIResourceDeviceSession extends APIResourceDeviceSessionCommon implements DeviceSession {
    abort(): APIResource<DeviceSessionModel, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    retry(): APIResource<DeviceSessionModel, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
}
export default APIResourceDeviceSession;
