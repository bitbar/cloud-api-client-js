import APIResource from './APIResource';
declare class APIAdminResourceRunStandalone extends APIResource {
    constructor(parent: object, id: number);
    abort(): APIResource;
    changeBillable(billable: boolean): APIResource;
    changePriority(priority: boolean): APIResource;
    retry(ids?: Array<number>): APIResource;
}
export default APIAdminResourceRunStandalone;
