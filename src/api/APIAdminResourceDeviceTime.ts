import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIAdminResourceDeviceTime
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceDeviceTime extends APIResource {

  /**
   * /device-time
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('admin', 'device-time');
  }

  // /device-time/count-session-report
  public countSessionReport() {
    return new APIList(this).push('count-session-report');
  }

  // /device-time/step-time-report
  public stepTimeReport() {
    return new APIList(this).push('step-time-report');
  }

}

export default APIAdminResourceDeviceTime
