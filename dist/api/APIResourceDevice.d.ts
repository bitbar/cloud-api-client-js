import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceDevice extends APIResource {
    constructor(parent: object, id: number);
    properties(): APIList;
}
export default APIResourceDevice;
