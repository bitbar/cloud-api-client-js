import APIResource from './APIResource';
import APIResourceAdditionalUser from './APIResourceAdditionalUser';
import APIList from './APIList';
declare class APIResourceAccount extends APIResource {
    constructor(parent: object, id?: number);
    preferences(): APIResource;
    concurrencyStatus(): APIResource;
    roles(): APIList;
    role(id: number): APIResource;
    additionalUsers(): APIList;
    additionalUser(id: number): APIResourceAdditionalUser;
}
export default APIResourceAccount;
