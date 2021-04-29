import APIResource from './APIResource';
import APIResourceBuild from './APIResourceBuild';
import APIList from './APIList';
declare class APIResourceJob extends APIResource {
    constructor(parent: object, id: number);
    builds(): APIList;
    build(id: number): APIResourceBuild;
}
export default APIResourceJob;
