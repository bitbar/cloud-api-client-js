import APIResource from './APIResource';
import APIList from './APIList';
declare class APIAdminResourceDeviceTime extends APIResource {
    constructor(parent: object);
    countSessionReport(): APIList;
    stepTimeReport(): APIList;
}
export default APIAdminResourceDeviceTime;
