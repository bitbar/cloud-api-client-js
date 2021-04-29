import APIResource from './APIResource';
declare class APIResourceAccount extends APIResource {
    constructor(parent: object, id: number);
    concurrencyStatus(): APIResource;
    preferences(): APIResource;
}
export default APIResourceAccount;
