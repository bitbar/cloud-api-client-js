import { Screenshot } from './models/Screenshot';
import { CollectionBasicQueryParams, NoData } from './models/HTTP';
import APIList from './APIList';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
export declare class APIListScreenshots extends APIList<Screenshot, CollectionBasicQueryParams, NoData> {
    constructor(parent: APIResourceDeviceSessionCommon);
}
export default APIListScreenshots;
