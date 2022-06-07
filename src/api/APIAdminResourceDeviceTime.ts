import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {UserDeviceTime} from "./models/UserDeviceTime";
import {DeviceTimeCountSessionReportEntry} from "./models/DeviceTimeCountSessionReportEntry";
import {DeviceTimeStepTimeReportEntry} from "./models/DeviceTimeStepTimeReportEntry";

export class APIAdminResourceDeviceTime extends APIResource<UserDeviceTime> {

  /**
   * /admin/device-time
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'device-time');
  }

  // /device-time/count-session-report
  countSessionReport() {
    return new APIList<DeviceTimeCountSessionReportEntry>(this).push('count-session-report');
  }

  // /device-time/step-time-report
  stepTimeReport() {
    return new APIList<DeviceTimeStepTimeReportEntry>(this).push('step-time-report');
  }

}

export default APIAdminResourceDeviceTime
