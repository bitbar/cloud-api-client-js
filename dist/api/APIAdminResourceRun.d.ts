import APIList from './APIList';
import APIResource from './APIResource';
import APIResourceRun from './APIResourceRun';
declare class APIAdminResourceRun extends APIResourceRun {
    abort(): APIResource;
    retry(ids?: Array<number>): APIResource;
    changeBillable(): APIResource;
    changePriority(): APIResource;
    screenshotNames(): APIList;
    screenshots(): APIList;
    dataAvailability(): APIList;
    buildLogsZip(ids?: Array<number>): APIResource;
    logsZip(): APIResource;
    performanceZip(): APIResource;
    screenshotsZip(): APIResource;
}
export default APIAdminResourceRun;
