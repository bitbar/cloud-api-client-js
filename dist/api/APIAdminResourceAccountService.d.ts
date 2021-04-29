import APIResource from './APIResource';
declare class APIAdminResourceAccountService extends APIResource {
    constructor(parent: object, id: number);
    activate(): APIResource;
    deactivate(): APIResource;
}
export default APIAdminResourceAccountService;
