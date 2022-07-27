import {APIAdminResource} from "./APIAdminResource";
import {NoData} from "./APIEntity";
import {APIList} from './APIList'
import {NonRequestable} from "./decorators/NonRequestable";
import {AdminDeviceSessionStatistics, AdminStatisticsParams} from "./models/AdminDeviceSessionStatistics";
import {AdminFrameworkStatistics} from "./models/AdminFrameworkStatistics";


@NonRequestable
export class APIAdminListStatistics extends APIList {

  /**
   * /admin/statistics
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'statistics');
  }

  // /admin/statistics/device-sessions
  deviceSessions() {
    return new APIList<AdminDeviceSessionStatistics, AdminStatisticsParams, NoData>(this).push('device-sessions');
  }

  // /admin/statistics/frameworks
  frameworks() {
    return new APIList<AdminFrameworkStatistics, AdminStatisticsParams, NoData>(this).push('frameworks');
  }


}


export default APIAdminListStatistics
