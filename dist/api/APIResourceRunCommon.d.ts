import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceRunCommon extends APIResource {
    constructor(parent: object, id: number);
    abort(): APIResource;
    dataAvailability(): APIList;
    deviceSessions(): APIList;
    filesZip(ids?: Array<number>): APIResource;
    logsZip(ids?: Array<number>): APIResource;
    performanceZip(ids?: Array<number>): APIResource;
    retry(ids?: Array<number>): APIResource;
    screenshotNames(): APIList;
    screenshots(): APIList;
    screenshotsZip(ids?: Array<number>): APIResource;
    steps(): APIList;
    tags(): APIList;
    tag(id: number): APIResource;
}
export default APIResourceRunCommon;
