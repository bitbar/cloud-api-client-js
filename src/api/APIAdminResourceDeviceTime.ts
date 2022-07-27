import {APIAdminResource} from "./APIAdminResource";
import {NoData} from "./APIEntity";
import {APIList} from './APIList'
import {DeviceTimeCountSessionReportEntry} from "./models/DeviceTimeCountSessionReportEntry";
import {DeviceTimeStepTimeReportEntry} from "./models/DeviceTimeStepTimeReportEntry";
import {DeviceTimeParams, UserDeviceTime} from "./models/UserDeviceTime";

export class APIAdminResourceDeviceTime extends APIList<UserDeviceTime, DeviceTimeParams, NoData> {

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
