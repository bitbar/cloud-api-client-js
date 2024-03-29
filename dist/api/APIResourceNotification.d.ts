import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { NoQueryParams } from './models/HTTP';
import { Message } from './models/Message';
import { Notification, NotificationData } from './models/Notification';
export declare class APIResourceNotification extends APIResource<Notification, NoQueryParams, NotificationData> {
    constructor(parent: APIResourceUser, id: number);
    test(): APIResource<Message, NoQueryParams, void>;
}
export default APIResourceNotification;
