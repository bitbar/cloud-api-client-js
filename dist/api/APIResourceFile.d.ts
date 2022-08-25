import { API } from '../API';
import { APIAdminResource } from './APIAdminResource';
import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { DeviceGroupShareData } from './models/DeviceGroup';
import { CollectionBasicQueryParams } from './models/HTTP';
import { SharedResource } from './models/SharedResource';
import { FileSizeData, UserFile, UserFileTag } from './models/UserFile';
export declare class APIResourceFile extends APIResource<UserFile> {
    constructor(parent: API | APIAdminResource | APIResourceUser, id: number);
    file(): APIResource<UserFile, FileSizeData, void>;
    icon(): APIResource<any, import("./models/HTTP").QueryParams, import("./models/HTTP").QueryParams>;
    tags(): APIList<UserFileTag, CollectionBasicQueryParams, void>;
    share(): APIList<SharedResource, DeviceGroupShareData, any>;
}
export default APIResourceFile;
