import APIList from './APIList';
import APIResource from './APIResource';
declare class APIListUsers extends APIList {
    constructor(parent: object);
    activate(): APIResource;
    recoveries(): APIResource;
    passwordRecovery(): APIResource;
    resetApiKey(): APIResource;
    validateVatId(): APIResource;
}
export default APIListUsers;
