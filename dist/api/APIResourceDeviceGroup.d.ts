import APIResource from './APIResource';
import APIList from './APIList';
declare class APIResourceDeviceGroup extends APIResource {
    constructor(parent: object, id: number);
    devices(): APIList;
    device(id: number): APIResource;
    selectors(): APIList;
    selector(id: number): APIResource;
}
export default APIResourceDeviceGroup;
