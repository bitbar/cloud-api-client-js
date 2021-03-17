import APIResource from './APIResource'
import APIList from './APIList';

import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';

import postAdminDeviceSessionChangeBillable from './factory/postAdminDeviceSessionChangeBillable';

import DeviceSessionStandalone from './interface/DeviceSessionStandalone';
import DeviceSessionCommon from './interface/DeviceSessionCommon';


/**
 * APIAdminResourceDevice
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon implements DeviceSessionCommon, DeviceSessionStandalone {

  // /admin/device-sessions/{id}/changebillable
  public changeBillable (billable: boolean) {
    return postAdminDeviceSessionChangeBillable(this, billable);
  }

  // /device-sessions/{id}/connections
  public connections () {
    return new APIList(this).push('connections');
  }

  // /device-sessions/{id}/connections/{id}
  public connection (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('connections', id);
  }

  // /device-sessions/{id}/release
  public release () {
    return new APIResource(this).push('release').post();
  }

}

export default APIAdminResourceDeviceSessionStandalone
