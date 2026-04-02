import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {Browser, DeviceBrowserData} from './models/Browser';
import {DeviceModel, DeviceModelData} from './models/DeviceModel';
import {NoQueryParams} from './models/HTTP';
import {AdminDeviceSession} from './models/AdminDeviceSession';


export class APIAdminResourceDeviceModel extends APIResource<DeviceModel, NoQueryParams, DeviceModelData> {

  /**
   * /admin/device-models/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'device-models', id);
  }

  // /admin/device-models/{id}/browsers
  browsers() {
    return new APIList<Browser, NoQueryParams, DeviceBrowserData>(this).push('browsers');
  }

  // /admin/device-models/{id}/queue
  queue() {
    return new APIList<AdminDeviceSession>(this).push('queue');
  }

}

export default APIAdminResourceDeviceModel;
