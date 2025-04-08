import { API } from '../API';
import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { CollectionBasicQueryParams } from './models/HTTP';
import { Property } from './models/Property';
import { ShareData, SharedResource } from './models/SharedResource';
import { FileSizeData, UserFile, UserFileTag } from './models/UserFile';
export declare class APIResourceFile extends APIResource<UserFile> {
    constructor(parent: API | APIAdminResource | APIResourceUser, id: number);
    file(): APIResource<UserFile, FileSizeData, void>;
    icon(): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    tags(): APIList<UserFileTag, CollectionBasicQueryParams, void>;
    share(): APIList<SharedResource, ShareData, ShareData>;
    property(id: number): APIResource<Property, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
}
export default APIResourceFile;
