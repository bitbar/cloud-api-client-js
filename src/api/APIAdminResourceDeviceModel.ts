import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIAdminResourceDeviceModel
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceDeviceModel extends APIResource {

  /**
   * /device-models/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'device-models', id);
  }

  // /device-models/{id}/browsers
  public browsers () {
    return new APIList(this).push('browsers');
  }

}

export default APIAdminResourceDeviceModel
