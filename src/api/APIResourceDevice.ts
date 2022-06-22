import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList, CollectionBasicQueryParams} from './APIList'
import {APIResource} from './APIResource'
import {Device, DeviceProperty} from './models/Device';
import {QueryParams} from './models/HTTP';

export interface DeviceProperiesData extends QueryParams {
  labelId: number
}

export class APIResourceDevice extends APIResource<Device> {

  /**
   * /devices/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
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
