import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceDevice extends APIResource {
    constructor(parent: object, id: number);
    queue(): APIList;
}
export default APIAdminResourceDevice;
