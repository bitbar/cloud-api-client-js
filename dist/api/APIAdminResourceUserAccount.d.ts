import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceUserAccount extends APIResource {
    constructor(parent: object);
    roles(): APIList;
    role(id: number): APIResource;
    services(): APIList;
    update(): APIResource;
}
export default APIAdminResourceUserAccount;
