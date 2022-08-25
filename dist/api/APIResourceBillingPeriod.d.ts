import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { BillingPeriod } from './models/BillingPeriod';
import { NoData, NoQueryParams } from './models/HTTP';
export declare class APIResourceBillingPeriod extends APIResource<BillingPeriod, NoQueryParams, NoData> {
    constructor(parent: APIResourceUser, id: number);
    receipt(): APIResource<void, NoQueryParams, void>;
}
export default APIResourceBillingPeriod;
