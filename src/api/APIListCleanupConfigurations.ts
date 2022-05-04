import APIAdminListDevices from "./APIAdminListDevices";
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {DeviceCleanupConfiguration} from "./models/Device";
import {QueryParams} from "./models/HTTP";


export type CleanupConfigurationData = Pick<DeviceCleanupConfiguration, 'content' | 'discriminator' | 'enabled' | 'osType'>;
export interface SpecificCleanupConfigurationQueryParams {
  serialId: string;
}


export class APIListCleanupConfigurations extends APIList<DeviceCleanupConfiguration, QueryParams, CleanupConfigurationData> {

  /**
   * /cleanup-configurations
   */
  constructor(parent: APIAdminListDevices) {
    super(parent);
    this.push('cleanup-configurations');
  }

  // /cleanup-configurations/specific
  specific() {
    return new APIResource<DeviceCleanupConfiguration, Partial<SpecificCleanupConfigurationQueryParams>, void>(this)
      .push('specific');
  }

}

export default APIListCleanupConfigurations
