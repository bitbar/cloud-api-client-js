import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'


/**
 * APIResourceDevice
 *
 * @class
 * @extends APIResource
 */
export class APIResourceDevice extends APIResource {

  /**
   * /devices/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('devices', id);
  }

  // /devices/{id}/properties
  public properties() {
    return new APIList(this).push('properties');
  }

}

export default APIResourceDevice
