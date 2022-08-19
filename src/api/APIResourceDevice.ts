import {API} from '../API';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {Device, DeviceProperiesData, DeviceProperty} from './models/Device';
import {CollectionBasicQueryParams} from './models/HTTP';


export class APIResourceDevice extends APIResource<Device> {

  /**
   * /devices/{id}
   */
  constructor(parent: API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('devices', id);
  }

  // /devices/{id}/properties
  properties() {
    return new APIList<DeviceProperty, CollectionBasicQueryParams, DeviceProperiesData>(this).push('properties');
  }

}

export default APIResourceDevice
