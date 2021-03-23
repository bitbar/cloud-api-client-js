import APIResource from './APIResource';
import APIList from './APIList';
import InputFileset from './class/InputFileset';
import OutputFileset from './class/OutputFileset';
import DeviceSessionCommon from './interface/DeviceSessionCommon';
declare class APIResourceDeviceSessionCommon extends APIResource implements DeviceSessionCommon {
    constructor(parent: object, id: number);
    commands(): APIList;
    input(): InputFileset;
    output(): OutputFileset;
    screenshots(): APIList;
    screenshot(id: number): APIResource;
    steps(): APIList;
    step(id: number | 'current'): APIResource;
    currentStep(): APIResource;
    testCaseRuns(): APIList;
}
export default APIResourceDeviceSessionCommon;
