import APIResource from './APIResource';
import APIResourceDeviceSession from './APIResourceDeviceSession'


/**
 * APIResourceManualSession
 *
 * @class
 * @extends APIResourceDeviceSession
 */
class APIResourceManualSession extends APIResourceDeviceSession {

  // /connections
  connections () {
    return new APIResource(this).push('connections');
  }
}

export default APIResourceManualSession
