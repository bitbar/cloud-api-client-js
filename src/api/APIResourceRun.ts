import {APIResourceDeviceSession} from './APIResourceDeviceSession'
import {APIResourceRunCommon} from './APIResourceRunCommon'
import {CollectionQueryParams} from './models/HTTP';

export class APIResourceRun extends APIResourceRunCommon {

  // /runs/{id}/device-sessions/{id}
  deviceSession(id: number) {
    return new APIResourceDeviceSession<CollectionQueryParams>(this, id);
  }

}

export default APIResourceRun
