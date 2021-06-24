import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceDeviceGroup extends APIResource {
    constructor(parent: object, id: number);
    devices(): APIList;
    device(id: number): APIResource;
    selectors(): APIList;
    selector(id: number): APIResource;
}
export default APIAdminResourceDeviceGroup;
