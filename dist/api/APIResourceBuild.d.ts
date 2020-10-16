import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceBuild extends APIResource {
    constructor(parent: object, id: number);
    abort(): APIResource;
    outputFiles(): APIList;
}
export default APIResourceBuild;
