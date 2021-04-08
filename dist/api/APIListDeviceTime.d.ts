import APIList from './APIList';
declare class APIListDeviceTime extends APIList {
    constructor(parent: object);
    reserved(): APIList;
    used(): APIList;
}
export default APIListDeviceTime;
