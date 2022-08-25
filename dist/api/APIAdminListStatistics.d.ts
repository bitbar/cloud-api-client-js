import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { AdminDeviceSessionStatistics, AdminStatisticsParams } from './models/AdminDeviceSessionStatistics';
import { AdminFrameworkStatistics } from './models/AdminFrameworkStatistics';
export declare class APIAdminListStatistics extends APIList {
    constructor(parent: APIAdminResource);
    deviceSessions(): APIList<AdminDeviceSessionStatistics, AdminStatisticsParams, void>;
    frameworks(): APIList<AdminFrameworkStatistics, AdminStatisticsParams, void>;
}
export default APIAdminListStatistics;
