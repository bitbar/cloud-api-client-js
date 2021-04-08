import APIResource from './APIResource';
declare class APIResourceAdditionalUser extends APIResource {
    constructor(parent: object, id: number);
    resendActivation(): APIResource;
}
export default APIResourceAdditionalUser;
