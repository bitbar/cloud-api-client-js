import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {postAdminDeviceSessionChangeBillable} from './factory/postAdminDeviceSessionChangeBillable';


/**
 * APIAdminResourceDevice
 *
 * @class
 */
export class APIAdminResourceDeviceSession extends APIResourceDeviceSessionCommon {

  // /admin/device-sessions/{id}/changebillable
  changeBillable (billable: boolean) {
    return postAdminDeviceSessionChangeBillable(this, billable);
  }

}

export default APIAdminResourceDeviceSession
