import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
import postAdminDeviceSessionChangeBillable from './factory/postAdminDeviceSessionChangeBillable';


/**
 * APIAdminResourceDevice
 *
 * @class
 */
class APIAdminResourceDeviceSession extends APIResourceDeviceSessionCommon {

  // /admin/device-sessions/{id}/changebillable
  public changeBillable (billable: boolean) {
    return postAdminDeviceSessionChangeBillable(this, billable);
  }

}

export default APIAdminResourceDeviceSession
