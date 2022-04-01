import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'


/**
 * APIAdminResourceDeviceModel
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceDeviceModel extends APIResource {

  /**
   * /device-models/{id}
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API, id: number) {
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
