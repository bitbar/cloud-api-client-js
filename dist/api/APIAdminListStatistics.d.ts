import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { AdminFrameworkStatistics, AdminStatisticsParams } from './models/AdminFrameworkStatistics';
export declare class APIAdminListStatistics extends APIList {
    constructor(parent: APIAdminResource);
    frameworks(): APIList<AdminFrameworkStatistics, AdminStatisticsParams, void>;
}
export default APIAdminListStatistics;
