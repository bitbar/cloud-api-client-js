import {APIResourceDeviceSession} from './APIResourceDeviceSession'
import {APIResourceRunCommon} from './APIResourceRunCommon'


/**
 * APIResourceRun
 *
 * @class
 * @extends APIResource
 */
export class APIResourceRun extends APIResourceRunCommon {

  // /runs/{id}/device-sessions/{id}
  public deviceSession(id: number) {
    return new APIResourceDeviceSession(this, id);
  }

}

export default APIResourceRun
