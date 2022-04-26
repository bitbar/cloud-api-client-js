import {API} from '../API';
import APIAdminListDevices from "./APIAdminListDevices";
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {DeviceCleanupConfiguration} from "./models/Device";


export class APIListCleanupConfigurations extends APIList<DeviceCleanupConfiguration> {

  /**
   * /cleanup-configurations
   */
  constructor(parent: APIAdminListDevices) {
    super(parent);
    this.push('cleanup-configurations');
  }

  // /cleanup-configurations/specific
  specific(): APIResource<DeviceCleanupConfiguration> {
    return new APIResource(this).push('specific');
  }

}

export default APIListCleanupConfigurations
