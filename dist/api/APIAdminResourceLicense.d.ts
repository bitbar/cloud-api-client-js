import { APIAdminResource } from './APIAdminResource';
import { APIResource } from './APIResource';
import { NoData, NoQueryParams } from './models/HTTP';
import { License } from './models/License';
export declare class APIAdminResourceLicense extends APIResource<License, NoQueryParams, NoData> {
    constructor(parent: APIAdminResource, id: number);
    activate(): APIResource<License, NoQueryParams, void>;
    deactivate(): APIResource<License, NoQueryParams, void>;
    resend(): APIResource<License, NoQueryParams, void>;
    download(): APIResource<Blob, NoQueryParams, void>;
}
export default APIAdminResourceLicense;
