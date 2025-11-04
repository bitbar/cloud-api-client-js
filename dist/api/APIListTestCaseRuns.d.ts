import { SessionQueryParams } from './models/DeviceSession';
import { CollectionBasicQueryParams, NoData, NoQueryParams } from './models/HTTP';
import APIList from './APIList';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
import { TestCaseRun } from './models/TestCaseRun';
export declare class APIListTestCaseRuns extends APIList<TestCaseRun, SessionQueryParams | CollectionBasicQueryParams | NoQueryParams, NoData> {
    constructor(parent: APIResourceDeviceSessionCommon);
}
export default APIListTestCaseRuns;
