import {APIAdminListDevices} from './APIAdminListDevices';
import {NoData} from './APIEntity';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {DeviceCleanupConfiguration} from './models/Device';
import {CollectionQueryParams} from './models/HTTP';


export type CleanupConfigurationData = Pick<DeviceCleanupConfiguration, 'content' | 'discriminator' | 'enabled' | 'osType'>;

export interface SpecificCleanupConfigurationQueryParams {
  serialId: string;
}


export class APIListCleanupConfigurations extends APIList<DeviceCleanupConfiguration, CollectionQueryParams, CleanupConfigurationData> {

  /**
   * /cleanup-configurations
   */
  constructor(parent: APIAdminListDevices) {
    super(parent);
    this.push('cleanup-configurations');
  }

  // /cleanup-configurations/specific
  specific() {
    return new APIResource<DeviceCleanupConfiguration, Partial<SpecificCleanupConfigurationQueryParams>, NoData>(this)
      .push('specific');
  }

}

export default APIListCleanupConfigurations
