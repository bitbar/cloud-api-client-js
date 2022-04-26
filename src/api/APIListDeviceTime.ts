import {APIList} from './APIList'
import APIResourceUser from "./APIResourceUser";
import {BasicDeviceTime, DeviceTime} from "./models/DeviceTime";


export class APIListDeviceTime extends APIList<DeviceTime> {

  /**
   * /device-time
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('device-time');
  }

  // /device-time/reserved
  reserved(): APIList<BasicDeviceTime> {
    return new APIList(this).push('reserved');
  }

  // /device-time/used
  used(): APIList<BasicDeviceTime> {
    return new APIList(this).push('used');
  }

}

export default APIListDeviceTime;
