import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIResourceBillingPeriod
 *
 * @class
 * @extends APIResource
 */
class APIResourceDeviceGroup extends APIResource {

  /**
   * /device-groups/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('device-groups', id);
  }

  // /device-groups/{id}/devices
  public devices () {
    return new APIList(this).push('devices');
  }

  // /device-groups/{id}/device/{id}
  public device (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('devices', id);
  }

  // /device-groups/{id}/selectors
  public selectors () {
    return new APIList(this).push('selectors');
  }

  // /device-groups/{id}/selectors/{id}
  public selector (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('selectors', id);
  }

  // /device-groups/{id}/share
  public share () {
    return new APIResource(this).push('share');
  }

}

export default APIResourceDeviceGroup
