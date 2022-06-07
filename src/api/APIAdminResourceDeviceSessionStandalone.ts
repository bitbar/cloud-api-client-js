import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
import {postAdminDeviceSessionChangeBillable} from './factory/postAdminDeviceSessionChangeBillable';
import {DeviceSessionCommon} from './interface/DeviceSessionCommon';
import {DeviceSessionStandalone} from './interface/DeviceSessionStandalone';
import {Connection} from "./models/Connection";
import {DeviceSession} from "./models/DeviceSession";


/**
 * APIAdminResourceDevice
 *
 *
 * It will require more work to decouple from regular session
 */
export class APIAdminResourceDeviceSessionStandalone extends APIResourceDeviceSessionCommon implements DeviceSessionCommon, DeviceSessionStandalone {

  // /admin/device-sessions/{id}/changebillable
  changeBillable(billable: boolean) {
    return postAdminDeviceSessionChangeBillable(this, billable);
  }

  // /runs/{id}/device-sessions/{id}/connections
  connections() {
    return new APIList<Connection>(this).push('connections');
  }

  // /runs/{id}/device-sessions/{id}/connections/{id}
  connection(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<Connection>(this).push('connections', id);
  }

  // /runs/{id}/device-sessions/{id}/release
  release() {
    return new APIResource<DeviceSession>(this).push('release').post();
  }

}

export default APIAdminResourceDeviceSessionStandalone
