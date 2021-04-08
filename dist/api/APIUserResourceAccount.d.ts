import APIResource from './APIResource';
import APIResourceAdditionalUser from './APIResourceAdditionalUser';
import APIList from './APIList';
declare class APIUserResourceAccount extends APIResource {
    constructor(parent: object);
    additionalUsers(): APIList;
    additionalUser(id: number): APIResourceAdditionalUser;
    serviceBillingPeriod(id: number): APIResource;
}
export default APIUserResourceAccount;
