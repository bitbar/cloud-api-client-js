import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIAdminResourceDevice
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceDevice extends APIResource {

  /**
   * /admin/devices/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'devices', id);
  }

  // /admin/devices/{id}/queue
  public queue () {
    return new APIList(this).push('queue');
  }

}

export default APIAdminResourceDevice
