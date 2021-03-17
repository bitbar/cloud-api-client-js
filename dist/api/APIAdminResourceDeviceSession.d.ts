import APIResource from './APIResource';
import APIList from './APIList';
import InputFileset from './extra-class/InputFileset';
import OutputFileset from './extra-class/OutputFileset';
declare class APIAdminResourceDeviceSession extends APIResource {
    constructor(parent: object, id: number);
    changeBillable(billable: boolean): APIResource;
    connections(): APIList;
    connection(id: number): APIResource;
    input(): InputFileset;
    output(): OutputFileset;
    release(): APIResource;
    screenshots(): APIList;
    screenshot(id: number): APIResource;
    steps(): APIList;
    step(id: number | 'current'): APIResource;
    currentStep(): APIResource;
    testCaseRuns(): APIList;
}
export default APIAdminResourceDeviceSession;
