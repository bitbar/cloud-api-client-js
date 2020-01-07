import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIResourceDevice
 *
 * @class
 * @extends APIResource
 */
class APIResourceDevice extends APIResource {

  /**
   * /devices/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('devices', id);
  }

  // /devices/{id}/properties
  public properties () {
    return new APIList(this).push('properties');
  }

}

export default APIResourceDevice
