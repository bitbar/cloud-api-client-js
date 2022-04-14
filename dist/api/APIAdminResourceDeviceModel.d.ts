import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceDeviceModel extends APIResource {
    constructor(parent: object, id: number);
    browsers(): APIList;
}
export default APIAdminResourceDeviceModel;
