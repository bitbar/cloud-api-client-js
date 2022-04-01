import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIResourceBillingPeriod
 *
 * @class
 * @extends APIResource
 */
export class APIResourceDeviceGroup extends APIResource {

  /**
   * /device-groups/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('device-groups', id);
  }

  // /device-groups/{id}/devices
  public devices() {
    return new APIList(this).push('devices');
  }

  // /device-groups/{id}/device/{id}
  public device(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('devices', id);
  }

  // /device-groups/{id}/selectors
  public selectors() {
    return new APIList(this).push('selectors');
  }

  // /device-groups/{id}/selectors/{id}
  public selector(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('selectors', id);
  }

  // /device-groups/{id}/share
  public share() {
    return new APIResource(this).push('share');
  }

}

export default APIResourceDeviceGroup
