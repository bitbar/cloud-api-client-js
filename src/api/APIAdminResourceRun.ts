import {APIAdminResourceDeviceSession} from './APIAdminResourceDeviceSession';
import {APIResourceRunCommon} from './APIResourceRunCommon';


export class APIAdminResourceRun extends APIResourceRunCommon {

  // /runs/{id}/device-sessions/{id}
  deviceSession(id: number) {
    return new APIAdminResourceDeviceSession(this, id);
  }

}

export default APIAdminResourceRun
