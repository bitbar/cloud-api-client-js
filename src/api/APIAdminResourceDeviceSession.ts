import APIResource from './APIResource'


/**
 * APIAdminResourceDevice
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceDeviceSession extends APIResource {

  /**
   * /admin/device-sessions/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin');
    this.push('device-sessions', id);
  }

  // /admin/device-sessions/{id}/changebillable
  public changeBillable () {
    return new APIResource(this).push('changebillable').post();
  }

}

export default APIAdminResourceDeviceSession
