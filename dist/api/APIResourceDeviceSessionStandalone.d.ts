import DeviceSessionStandalone from './interface/DeviceSessionStandalone';
import APIList from './APIList';
import APIResource from './APIResource';
import InputFileset from './class/InputFileset';
import OutputFileset from './class/OutputFileset';
declare class APIResourceDeviceSessionStandalone extends APIResource implements DeviceSessionStandalone {
    constructor(parent: object, id: number);
    connections(): APIList;
    connection(id: number): APIResource;
    input(): InputFileset;
    output(): OutputFileset;
    release(): APIResource;
}
export default APIResourceDeviceSessionStandalone;
