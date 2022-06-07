import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {Browser} from "./models/Browser";
import {DeviceModel} from "./models/DeviceModel";


export class APIAdminResourceDeviceModel extends APIResource<DeviceModel> {

  /**
   * /device-models/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'device-models', id);
  }

  // /device-models/{id}/browsers
  browsers() {
    return new APIList<Browser>(this).push('browsers');
  }

}

export default APIAdminResourceDeviceModel;
