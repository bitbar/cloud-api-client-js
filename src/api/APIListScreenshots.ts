import {Screenshot} from './models/Screenshot';
import {SessionQueryParams, SessionRunStepQueryParams, SessionStepQueryParams} from './models/DeviceSession';
import {NoData} from './models/HTTP';
import APIList from './APIList';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';


export class APIListScreenshots extends APIList<Screenshot, SessionQueryParams | SessionRunStepQueryParams | SessionStepQueryParams, NoData> {

  /**
   * /screenshots
   */
  constructor(parent: APIResourceDeviceSessionCommon) {
    super(parent);
    this.push('screenshots');
  }
}

export default APIListScreenshots
