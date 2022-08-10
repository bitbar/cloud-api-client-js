import {API} from '../API';
import {APIEntity, NoData} from './APIEntity';
import {APIResource} from './APIResource'
import {CleanupConfigurationSpecificData, DeviceCleanupConfiguration} from './models/Device';


export class APIResourceCleanupConfiguration extends APIResource<DeviceCleanupConfiguration> {
  //shuldn't it be APIAdminResourceCleanupConfiguration

  /**
   * admin/devices/cleanup-configurations/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('cleanup-configurations', id);
  }

  // admin/devices/cleanup-configurations/specific
  devices() {
    return new APIResource<DeviceCleanupConfiguration, CleanupConfigurationSpecificData, NoData>(this).push('devices');
  }

}

export default APIResourceCleanupConfiguration
