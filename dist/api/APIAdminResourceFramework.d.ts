import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceFramework extends APIResource {
    constructor(parent: object, id: number);
    config(): APIResource;
    requiredRoles(): APIList;
}
export default APIAdminResourceFramework;
