import { NoData } from './models/HTTP';
import { TestCaseRun } from './models/TestCaseRun';
import APIList, { APIListQuery } from './APIList';
import { SessionQueryParams } from './models/DeviceSession';
import APIResourceDeviceSessionCommon from './APIResourceDeviceSessionCommon';
export declare class APIListTestCaseRuns<Q extends APIListQuery = SessionQueryParams> extends APIList<TestCaseRun, Q, NoData> {
    constructor(parent: APIResourceDeviceSessionCommon);
}
export default APIListTestCaseRuns;
