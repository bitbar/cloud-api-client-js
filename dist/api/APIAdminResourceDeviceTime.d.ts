import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { DeviceTimeCountSessionReportEntry } from './models/DeviceTimeCountSessionReportEntry';
import { DeviceTimeStepTimeReportEntry } from './models/DeviceTimeStepTimeReportEntry';
import { NoData } from './models/HTTP';
import { DeviceTimeParams, UserDeviceTime } from './models/UserDeviceTime';
export declare class APIAdminResourceDeviceTime extends APIList<UserDeviceTime, DeviceTimeParams, NoData> {
    constructor(parent: APIAdminResource);
    countSessionReport(): APIList<DeviceTimeCountSessionReportEntry, import("./models/HTTP").CollectionQueryParams, any>;
    stepTimeReport(): APIList<DeviceTimeStepTimeReportEntry, import("./models/HTTP").CollectionQueryParams, any>;
}
export default APIAdminResourceDeviceTime;
