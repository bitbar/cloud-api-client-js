import APIList from './APIList';
import APIResource from './APIResource';
import OutputFileset from './class/OutputFileset';
declare class APIResourceDeviceSessionStandalone extends APIResource {
    constructor(parent: object, id: number);
    connections(): APIList;
    connection(id: number): APIResource;
    output(): OutputFileset;
    release(): APIResource;
}
export default APIResourceDeviceSessionStandalone;
