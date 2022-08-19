import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { NoQueryParams } from './models/HTTP';
import { Notification } from './models/Notification';
import { NotificationPlan, NotificationPlanEditData } from './models/NotificationPlan';
export declare class APIAdminResourceNotificationPlan extends APIResource<NotificationPlan, NoQueryParams, NotificationPlanEditData> {
    constructor(parent: APIAdminResource, id: number);
    check(): APIList<Notification, import("./models/HTTP").CollectionQueryParams, any>;
    test(): APIResource<NotificationPlan, NoQueryParams, void>;
    execute(): APIResource<NotificationPlan, NoQueryParams, void>;
}
export default APIAdminResourceNotificationPlan;
