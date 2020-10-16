import APIResource from './APIResource';
import APIList from './APIList';
import InputFileset from './extra-class/InputFileset';
import OutputFileset from './extra-class/OutputFileset';
declare class APIResourceDeviceSession extends APIResource {
    constructor(parent: object, id: number);
    clusterLogs(): APIResource;
    dataAvailability(): APIResource;
    fixturesZip(): APIResource;
    junitXml(): APIResource;
    logs(): APIResource;
    performance(): APIResource;
    release(): APIResource;
    resultDataZip(): APIResource;
    screenshots(): APIList;
    screenshot(id: number): APIResource;
    steps(): APIList;
    step(id: number | 'current'): APIResource;
    currentStep(): APIResource;
    testCaseRuns(): APIList;
    retry(): APIResource;
    input(): InputFileset;
    output(): OutputFileset;
    videos(): void;
    connections(): APIList;
}
export default APIResourceDeviceSession;
