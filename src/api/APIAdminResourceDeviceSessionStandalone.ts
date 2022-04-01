import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {postAdminDeviceSessionChangeBillable} from './factory/postAdminDeviceSessionChangeBillable';
import {DeviceSessionCommon} from './interface/DeviceSessionCommon';
import {DeviceSessionStandalone} from './interface/DeviceSessionStandalone';


/**
 * APIAdminResourceDevice
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon implements DeviceSessionCommon, DeviceSessionStandalone {

  // /admin/device-sessions/{id}/changebillable
  public changeBillable(billable: boolean) {
    return postAdminDeviceSessionChangeBillable(this, billable);
  }

  // /device-sessions/{id}/connections
  public connections() {
    return new APIList(this).push('connections');
  }

  // /device-sessions/{id}/connections/{id}
  public connection(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('connections', id);
  }

  // /device-sessions/{id}/release
  public release() {
    return new APIResource(this).push('release').post();
  }

}

export default APIAdminResourceDeviceSessionStandalone
