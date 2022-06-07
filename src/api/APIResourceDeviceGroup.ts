import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {DeviceGroup} from "./models/DeviceGroup";

/**
 * APIResourceBillingPeriod
 *
 * @class
 * @extends APIResource
 */
export class APIResourceDeviceGroup extends APIResource<DeviceGroup> {

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
  devices() {
    return new APIList(this).push('devices');
  }

  // /device-groups/{id}/device/{id}
  device(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('devices', id);
  }

  // /device-groups/{id}/selectors
  selectors() {
    return new APIList(this).push('selectors');
  }

  // /device-groups/{id}/selectors/{id}
  selector(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('selectors', id);
  }

  // /device-groups/{id}/share
  share() {
    return new APIResource(this).push('share');
  }

}

export default APIResourceDeviceGroup
