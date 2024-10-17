import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {AdminDevice, AdminDeviceData} from './models/AdminDevice';
import {AdminDeviceSession} from './models/AdminDeviceSession';
import {
  DeviceCleanupConfiguration,
  DeviceCleanupConfigurationData,
  DeviceLabelData,
  DeviceProperty
} from './models/Device';
import {NoData, NoQueryParams, QueryParams} from './models/HTTP';


export class APIAdminResourceDevice extends APIResource<AdminDevice, NoQueryParams, AdminDeviceData> {

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

  // /admin/devices/{id}/cleanup-configuration
  cleanupConfiguration() {
    return new APIResource<DeviceCleanupConfiguration, QueryParams, DeviceCleanupConfigurationData>(this).push('cleanup-configuration');
  }

  // /admin/devices/{id}/labels
  labels() {
    return new APIList<DeviceProperty, NoQueryParams, DeviceLabelData>(this).push('labels');
  }

  // /admin/devices/{id}/labels/{id}
  label(id: number) {
    return new APIResource<DeviceProperty, NoQueryParams, NoData>(this).push('labels', id);
  }

  // /admin/devices/{id}/queue
  queue() {
    return new APIList<AdminDeviceSession>(this).push('queue');
  }

}

export default APIAdminResourceDevice
