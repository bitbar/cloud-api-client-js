import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceNotificationPlan extends APIResource {
    constructor(parent: object, id: number);
    check(): APIList;
    test(): APIResource;
    execute(): APIResource;
}
export default APIAdminResourceNotificationPlan;
