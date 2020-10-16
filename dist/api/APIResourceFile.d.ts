import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceFile extends APIResource {
    constructor(parent: object, id: number);
    file(): APIResource;
    icon(): APIResource;
    tags(): APIList;
}
export default APIResourceFile;
