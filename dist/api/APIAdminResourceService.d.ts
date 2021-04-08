import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceService extends APIResource {
    constructor(parent: object, id: number);
    activate(): APIResource;
    deactivate(): APIResource;
    roles(): APIList;
}
export default APIAdminResourceService;
