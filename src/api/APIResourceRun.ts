import APIResourceRunCommon from './APIResourceRunCommon'
import APIResourceDeviceSession from './APIResourceDeviceSession'


/**
 * APIResourceRun
 *
 * @class
 * @extends APIResource
 */
class APIResourceRun extends APIResourceRunCommon {

  // /runs/{id}/device-sessions/{id}
  public deviceSession (id: number) {
    return new APIResourceDeviceSession(this, id);
  }

}

export default APIResourceRun
