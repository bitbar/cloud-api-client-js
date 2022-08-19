import {APIAdminListDevices} from './APIAdminListDevices';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {CleanupConfigurationData, SpecificCleanupConfigurationQueryParams} from './models/CleanupConfiguration';
import {DeviceCleanupConfiguration} from './models/Device';
import {CollectionQueryParams, NoData} from './models/HTTP';


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
