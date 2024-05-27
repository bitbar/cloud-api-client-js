import { APIResource } from './APIResource';
import { APIResourceUser } from './APIResourceUser';
import { Account } from './models/Account';
import { AccountServicePayment } from './models/AccountServicePayment';
import { BillingPeriodQueryParams } from './models/BillingPeriod';
import { NoQueryParams } from './models/HTTP';
import { VisualTestAccess } from './models/VisualTest';
export declare class APIUserResourceAccount extends APIResource<Account> {
    constructor(parent: APIResourceUser);
    serviceBillingPeriod(id: number): APIResource<AccountServicePayment, BillingPeriodQueryParams, void>;
    visualTestAccess(): APIResource<VisualTestAccess, NoQueryParams, VisualTestAccess>;
}
export default APIUserResourceAccount;
