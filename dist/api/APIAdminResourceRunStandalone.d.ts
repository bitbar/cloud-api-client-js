import { APIAdminResource } from './APIAdminResource';
import { APIResource } from './APIResource';
import { AdminTestRun, RunChangeBillableParams, RunChangePriorityParams } from './models/AdminTestRun';
import { NoData, NoQueryParams } from './models/HTTP';
export declare class APIAdminResourceRunStandalone extends APIResource<AdminTestRun, NoQueryParams, NoData> {
    constructor(parent: APIAdminResource, id: number);
    abort(): APIResource<AdminTestRun, NoQueryParams, void>;
    changeBillable(billable: boolean): APIResource<AdminTestRun, RunChangeBillableParams, RunChangeBillableParams>;
    changePriority(priority: boolean): APIResource<AdminTestRun, RunChangePriorityParams, RunChangePriorityParams>;
    retry(ids?: Array<number>): APIResource<AdminTestRun, import("..").BuildLogsData, import("..").BuildLogsData>;
}
export default APIAdminResourceRunStandalone;
