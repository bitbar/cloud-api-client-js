import APIList from './APIList'
import APIResource from './APIResource'


/**
 * APIListDevices
 *
 * @class
 * @extends APIList
 */
class APIListDevices extends APIList {

  /**
   * /devices
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('devices');
  }

  // /devices/filters
  public filters () {
    return new APIResource(this).push('filters');
  }

  // /devices/cleanup-configurations
  public cleanupConfigurations () {
    return new APIList(this).push('cleanup-configurations');
  }

  /**
   * /devices/cleanup-configurations/{id}
   *
   * @param {number} id - Resource ID
   */
  public cleanupConfiguration (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('cleanup-configurations', id);
  }

  // /devices/desktop-browser-capabilities
  public desktopBrowserCapabilities () {
    return new APIResource(this).push('desktop-browser-capabilities');
  }

}

export default APIListDevices;
