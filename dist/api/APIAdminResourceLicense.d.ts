import APIResource from './APIResource';
declare class APIAdminResourceLicense extends APIResource {
    constructor(parent: object, id: number);
    activate(): APIResource;
    deactivate(): APIResource;
    resend(): APIResource;
    download(): APIResource;
}
export default APIAdminResourceLicense;
