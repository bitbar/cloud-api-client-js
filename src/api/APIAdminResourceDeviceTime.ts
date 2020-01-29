import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIAdminResourceDeviceTime
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceDeviceTime extends APIResource {

  /**
   * /device-time
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('device-time');
  }

  // /device-time/count-session-report
  public countSessionReport () {
    return new APIList(this).push('count-session-report');
  }

  // /device-time/step-time-report
  public stepTimeReport () {
    return new APIList(this).push('step-time-report');
  }

}

export default APIAdminResourceDeviceTime
