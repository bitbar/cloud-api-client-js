import { APIList } from './APIList';
import { APIResourceChannel } from './APIResourceChannel';
import { APIResourceUser } from './APIResourceUser';
import { Enum } from './models/Enum';
import { CollectionQueryParams, NoQueryParams } from './models/HTTP';
import { Notification, NotificationsData } from './models/Notification';
export declare class APIListNotifications extends APIList<Notification, CollectionQueryParams, NotificationsData> {
    constructor(parent: APIResourceUser);
    scopes(): APIList<Enum, NoQueryParams, void>;
    channels(): APIList<Enum, NoQueryParams, void>;
    channel(type: string): APIResourceChannel;
}
export default APIListNotifications;
