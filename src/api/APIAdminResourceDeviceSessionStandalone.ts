import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {postAdminDeviceSessionChangeBillable} from './factory/postAdminDeviceSessionChangeBillable';
import {DeviceSessionCommon} from './interface/DeviceSessionCommon';


/**
 * APIAdminResourceDevice
 *
 *
 * It will require more work to decouple from regular session
 */
export class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon implements DeviceSessionCommon {

  // /admin/device-sessions/{id}/changebillable
  changeBillable(billable: boolean) {
    return postAdminDeviceSessionChangeBillable(this, billable);
  }
}

export default APIAdminResourceDeviceSessionStandalone;
