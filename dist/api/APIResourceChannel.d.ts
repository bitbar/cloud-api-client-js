import { APIList } from './APIList';
import { APIListNotifications } from './APIListNotifications';
import { APIResource } from './APIResource';
export declare class APIResourceChannel extends APIResource {
    constructor(parent: APIListNotifications, type: string);
    scopes(): APIList<any, import("./models/HTTP").CollectionQueryParams, any>;
}
export default APIResourceChannel;
