import APIResource from './APIResource';
declare class APIResourceAccountService extends APIResource {
    constructor(parent: object, id: number);
    activate(): APIResource;
    deactivate(): APIResource;
    billingPeriod(): APIResource;
}
export default APIResourceAccountService;
