import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIListCleanupConfigurations} from "./APIListCleanupConfigurations";
import {APIResource} from './APIResource'
import {APIResourceCleanupConfiguration} from "./APIResourceCleanupConfiguration";


/**
 * APIAdminListDevices
 *
 * @class
 * @extends APIList
 */
export class APIAdminListDevices extends APIList {

  /**
   * /devices
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('admin', 'devices');
  }

  // /devices/filters
  public filters () {
    return new APIResource(this).push('filters');
  }

  // /devices/cleanup-configurations
  public cleanupConfigurations () {
    return new APIListCleanupConfigurations(this);
  }

  /**
   * /devices/cleanup-configurations/{id}
   *
   * @param {number} id - Resource ID
   */
  public cleanupConfiguration (id: number) {
    return new APIResourceCleanupConfiguration(this, id);
  }

  // /devices/desktop-browser-capabilities
  public desktopBrowserCapabilities () {
    return new APIResource(this).push('desktop-browser-capabilities');
  }

}

export default APIAdminListDevices;
