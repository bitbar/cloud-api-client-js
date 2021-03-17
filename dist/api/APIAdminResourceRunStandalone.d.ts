import APIList from './APIList';
import APIResource from './APIResource';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
declare class APIAdminResourceRunStandalone extends APIResource {
    constructor(parent: object, id: number);
    abort(): APIResource;
    changeBillable(billable: boolean): APIResource;
    changePriority(priority: boolean): APIResource;
    retry(ids?: Array<number>): APIResource;
    deviceSessions(): APIList;
    deviceSession(id: number): APIResourceDeviceSessionCommon;
}
export default APIAdminResourceRunStandalone;
