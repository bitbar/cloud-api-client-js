import APIResource from './APIResource';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';

import DeviceSession from './interface/DeviceSession';


/**
 * APIResourceDeviceSession
 *
 * @class
 * @extends APIResource
 */
class APIResourceDeviceSession extends APIResourceDeviceSessionCommon implements DeviceSession {

  // /device-sessions/{id}/abort
  public abort () {
    return new APIResource(this).push('abort').post();
  }

  // /device-sessions/{id}/retry
  public retry () {
    return new APIResource(this).push('retry').post();
  }

}

export default APIResourceDeviceSession
