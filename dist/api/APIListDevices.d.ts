import APIList from './APIList';
import APIResource from './APIResource';
declare class APIListDevices extends APIList {
    constructor(parent: object);
    filters(): APIResource;
    cleanupConfigurations(): APIList;
    cleanupConfiguration(id: number): APIResource;
}
export default APIListDevices;
