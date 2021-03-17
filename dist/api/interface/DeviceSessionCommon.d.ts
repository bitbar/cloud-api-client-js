import APIList from '../APIList';
import APIResource from '../APIResource';
import DeviceSessionBase from './DeviceSessionBase';
interface DeviceSessionCommon extends DeviceSessionBase {
    screenshots(): APIList;
    screenshot(id: number): APIResource;
    steps(): APIList;
    step(id: number | 'current'): APIResource;
    currentStep(): APIResource;
    testCaseRuns(): APIList;
}
export default DeviceSessionCommon;
