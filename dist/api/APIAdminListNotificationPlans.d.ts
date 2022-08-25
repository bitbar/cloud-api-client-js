import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { Enum } from './models/Enum';
import { CollectionQueryParams, NoQueryParams } from './models/HTTP';
import { NotificationPlan, NotificationPlanData } from './models/NotificationPlan';
export declare class APIAdminListNotificationPlans extends APIList<NotificationPlan, CollectionQueryParams, NotificationPlanData> {
    constructor(parent: APIAdminResource);
    channels(): APIList<Enum, NoQueryParams, void>;
    scopes(): APIList<Enum, NoQueryParams, void>;
}
export default APIAdminListNotificationPlans;
