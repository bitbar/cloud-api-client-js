import {APIEntity} from './APIEntity';
import {APIList} from './APIList';
import {APIResourceUser} from './APIResourceUser';
import {NoData} from './models/HTTP';
import {BasicDeviceTime, DeviceTimeQueryParams, UserDeviceTime} from './models/UserDeviceTime';


export class APIListDeviceTime extends APIList<UserDeviceTime, DeviceTimeQueryParams, NoData> {

  /**
   * /device-time
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('device-time');
  }

  // /device-time/reserved
  reserved() {
    return new APIEntity<BasicDeviceTime>(this).push('reserved');
  }

  // /device-time/used
  used() {
    return new APIEntity<BasicDeviceTime>(this).push('used');
  }

}

export default APIListDeviceTime;
