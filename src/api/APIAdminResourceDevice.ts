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

  // /admin/devices/{id}/cleanup-configuration
  public cleanupConfiguration () {
    return new APIResource(this).push('cleanup-configuration');
  }

  // /admin/devices/{id}/labels
  public labels () {
    return new APIList(this).push('labels');
  }

  // /admin/devices/{id}/labels/{id}
  public label (id: number) {
    return new APIResource(this).push('labels', id);
  }

  // /admin/devices/{id}/blink
  public blink () {
    return new APIResource(this).push('blink').post();
  }

}

export default APIAdminResourceDevice
