import {APIResource} from './APIResource';
import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {DeviceSession} from './interface/DeviceSession';
import {DeviceSession as DeviceSessionModel} from './models/DeviceSession';

export class APIResourceDeviceSession extends APIResourceDeviceSessionCommon implements DeviceSession {

  // /device-sessions/{id}/abort
  abort() {
    return new APIResource<DeviceSessionModel>(this).push('abort').post();
  }

  // /device-sessions/{id}/retry
  retry() {
    return new APIResource<DeviceSessionModel>(this).push('retry').post();
  }

}

export default APIResourceDeviceSession
