import { APIList } from './APIList';
import { APIResource } from './APIResource';
import { APIResourceAdditionalUser } from './APIResourceAdditionalUser';
import { APIResourceUser } from './APIResourceUser';
import { Account } from './models/Account';
import { AccountServicePayment } from './models/AccountServicePayment';
import { BillingPeriodQueryParams } from './models/BillingPeriod';
import { CollectionBasicQueryParams, NoQueryParams } from './models/HTTP';
import { User, UserData } from './models/User';
import { VisualTestAccess } from './models/VisualTest';
export declare class APIUserResourceAccount extends APIResource<Account> {
    constructor(parent: APIResourceUser);
    additionalUsers(): APIList<User, CollectionBasicQueryParams, UserData>;
    additionalUser(id: number): APIResourceAdditionalUser;
    serviceBillingPeriod(id: number): APIResource<AccountServicePayment, BillingPeriodQueryParams, void>;
    visualTestAccess(): APIResource<VisualTestAccess, NoQueryParams, VisualTestAccess>;
}
export default APIUserResourceAccount;
