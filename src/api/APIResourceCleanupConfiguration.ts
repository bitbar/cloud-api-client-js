import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {DeviceCleanupConfiguration} from './models/Device';
import {QueryParams} from './models/HTTP';

export interface CleanupConfigurationData extends QueryParams {
  content: string;
  discriminator: string;
  enabled: boolean;
}

export interface CleanupConfigurationSpecificData extends QueryParams {
  serialId: string;
}

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
    return new APIResource<DeviceCleanupConfiguration, CleanupConfigurationSpecificData, void>(this).push('devices');
  }

}

export default APIResourceCleanupConfiguration
