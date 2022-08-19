import {APIResourceDeviceSession} from './APIResourceDeviceSession'
import {APIResourceRunCommon} from './APIResourceRunCommon'

export class APIResourceRun extends APIResourceRunCommon {

  // /runs/{id}/device-sessions/{id}
  deviceSession(id: number) {
    return new APIResourceDeviceSession(this, id);
  }

}

export default APIResourceRun
