import { APIResource } from './APIResource';
import { BillingPeriod } from './models/BillingPeriod';
import { NoData, NoQueryParams } from './models/HTTP';
import { APIResourceAccount } from './APIResourceAccount';
export declare class APIResourceBillingPeriod extends APIResource<BillingPeriod, NoQueryParams, NoData> {
    constructor(parent: APIResourceAccount, id: number);
    receipt(): APIResource<void, NoQueryParams, void>;
}
export default APIResourceBillingPeriod;
