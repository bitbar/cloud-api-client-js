import { API } from '../API';
import { APIEntity } from './APIEntity';
import { APIResource } from './APIResource';
import { AccountService } from './models/AccountService';
import { AccountServicePayment } from './models/AccountServicePayment';
import { BillingPeriodQueryParams } from './models/BillingPeriod';
export declare class APIResourceAccountService extends APIResource<AccountService> {
    constructor(parent: APIEntity<any> | API, id: number);
    billingPeriod(): APIResource<AccountServicePayment, BillingPeriodQueryParams, void>;
}
export default APIResourceAccountService;
