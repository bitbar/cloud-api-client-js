import {APIResourceDeviceSession} from './APIResourceDeviceSession';
import {postAdminDeviceSessionChangeBillable} from './factory/postAdminDeviceSessionChangeBillable';


export class APIAdminResourceDeviceSession extends APIResourceDeviceSession {

  // /admin/device-sessions/{id}/changebillable
  changeBillable (billable: boolean) {
    return postAdminDeviceSessionChangeBillable(this, billable);
  }

}

export default APIAdminResourceDeviceSession
