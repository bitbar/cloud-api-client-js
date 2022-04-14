import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {APIResourceDeviceSessionCommon} from './APIResourceDeviceSessionCommon';
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
  changeBillable(billable: boolean) {
    const a = new APIResource(this);
    const deviceSessionId = a.last;

    return a.restack('admin', 'device-sessions', deviceSessionId, 'changebillable').params({
      billable
    }).post();
  }

  // /device-sessions/{id}/connections
  connections() {
    return new APIList(this).push('connections');
  }

  // /device-sessions/{id}/connections/{id}
  connection(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('connections', id);
  }

  // /device-sessions/{id}/release
  release() {
    return new APIResource(this).push('release').post();
  }

}

export default APIAdminResourceDeviceSessionStandalone
