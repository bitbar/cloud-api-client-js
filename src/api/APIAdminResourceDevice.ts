import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {AdminDevice} from "./models/AdminDevice";
import {AdminDeviceSession} from "./models/AdminDeviceSession";
import {DeviceCleanupConfiguration, DeviceProperty} from "./models/Device";


export class APIAdminResourceDevice extends APIResource<AdminDevice> {

  /**
   * /admin/devices/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'devices', id);
  }

  // /admin/devices/{id}/blink
  blink() {
    return new APIResource<AdminDevice>(this).push('blink').post();
  }

  // /admin/devices/{id}/cleanup-configuration
  cleanupConfiguration() {
    return new APIResource<DeviceCleanupConfiguration>(this).push('cleanup-configuration');
  }

  // /admin/devices/{id}/labels
  labels() {
    return new APIList<DeviceProperty>(this).push('labels');
  }

  // /admin/devices/{id}/labels/{id}
  label(id: number) {
    return new APIResource<DeviceProperty>(this).push('labels', id);
  }

  // /admin/devices/{id}/queue
  queue() {
    return new APIList<AdminDeviceSession>(this).push('queue');
  }

}

export default APIAdminResourceDevice
