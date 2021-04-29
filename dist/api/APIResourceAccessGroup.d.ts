import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceAccessGroup extends APIResource {
    constructor(parent: object, id: number);
    users(): APIList;
    user(id: number): APIResource;
    resources(): APIList;
    resource(id: number): APIResource;
}
export default APIResourceAccessGroup;
