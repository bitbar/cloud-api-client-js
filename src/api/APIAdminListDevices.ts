import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIListCleanupConfigurations} from './APIListCleanupConfigurations';
import {APIResourceCleanupConfiguration} from './APIResourceCleanupConfiguration';
import {AdminDevice, AdminDeviceData, AdminDevicesQueryParams} from './models/AdminDevice';


export class APIAdminListDevices extends APIList<AdminDevice, AdminDevicesQueryParams, AdminDeviceData> {

  /**
   * /admin/devices
   */
  constructor(parent: APIAdminResource | API) {
    super(parent);
    this.push('admin', 'devices');
  }

  // /admin/devices/cleanup-configurations
  cleanupConfigurations() {
    return new APIListCleanupConfigurations(this);
  }

  // /admin/devices/cleanup-configurations/{id}
  cleanupConfiguration(id: number) {
    return new APIResourceCleanupConfiguration(this, id);
  }

}

export default APIAdminListDevices;
