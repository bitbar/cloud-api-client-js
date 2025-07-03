import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {NoData} from './models/HTTP';
import {DeviceTimeParams, UserDeviceTime} from './models/UserDeviceTime';

export class APIAdminResourceDeviceTime extends APIList<UserDeviceTime, DeviceTimeParams, NoData> {

  /**
   * /admin/device-time
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'device-time');
  }
}

export default APIAdminResourceDeviceTime
