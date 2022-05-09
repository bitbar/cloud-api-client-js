import {APIList, CollectionQueryParams} from './APIList'
import APIResourceUser from "./APIResourceUser";
import {BasicDeviceTime, DeviceTime} from "./models/DeviceTime";


export interface DeviceTimeQueryParams extends CollectionQueryParams {
  forWholeAccount: boolean;
}


export class APIListDeviceTime extends APIList<DeviceTime, DeviceTimeQueryParams, void> {

  /**
   * /device-time
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('device-time');
  }

  // /device-time/reserved
  reserved() {
    return new APIList<BasicDeviceTime, void, void>(this).push('reserved');
  }

  // /device-time/used
  used() {
    return new APIList<BasicDeviceTime, void, void>(this).push('used');
  }

}

export default APIListDeviceTime;
